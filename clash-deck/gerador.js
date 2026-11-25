// Gerador de decks: monta decks de 8 cartas a partir das cartas fixadas pelo jogador,
// preenchendo as funções que um deck equilibrado precisa e priorizando sinergias.

if (typeof module !== "undefined") {
	// No Node os dados vêm do require; no navegador já estão globais via <script>.
	Object.assign(globalThis, require("./cartas.js"));
}

const ESTILOS = {
	qualquer: { alvo: 3.6, min: 2.6, max: 4.6, peso: 2 },
	ciclo: { alvo: 2.9, min: 2.5, max: 3.2, peso: 8 },
	equilibrado: { alvo: 3.6, min: 3.3, max: 3.9, peso: 6 },
	pesado: { alvo: 4.2, min: 4.0, max: 5.0, peso: 6 },
};

const TAMANHO_DECK = 8;

function tem(carta, papel) {
	return carta.papeis.includes(papel);
}

function contar(deck, teste) {
	return deck.filter(teste).length;
}

// Resumo das funções presentes no deck.
function analisarDeck(deck) {
	const naoFeitico = c => c.tipo !== "feitico";
	return {
		vitoria: contar(deck, c => tem(c, "W")),
		feiticoLeve: contar(deck, c => tem(c, "SS")),
		feiticoPesado: contar(deck, c => tem(c, "SB")),
		feiticos: contar(deck, c => c.tipo === "feitico" && !tem(c, "W")),
		aereo: contar(deck, c => naoFeitico(c) && tem(c, "A")),
		area: contar(deck, c => tem(c, "S")),
		mataTanque: contar(deck, c => tem(c, "K")),
		defesa: contar(deck, c => (tem(c, "B") && !tem(c, "W")) || tem(c, "MT")),
		construcoes: contar(deck, c => c.tipo === "construcao"),
		ciclo: contar(deck, c => tem(c, "C")),
		tanques: contar(deck, c => tem(c, "T")),
		campeoes: contar(deck, c => tem(c, "CH")),
		caras: contar(deck, c => c.elixir >= 6),
		reset: contar(deck, c => tem(c, "R")),
	};
}

function mediaElixir(deck) {
	return deck.reduce((s, c) => s + c.elixir, 0) / deck.length;
}

// Custo do "ciclo de 4": as 4 cartas mais baratas.
function cicloDe4(deck) {
	return [...deck].sort((a, b) => a.elixir - b.elixir).slice(0, 4).reduce((s, c) => s + c.elixir, 0);
}

// Pode esta carta entrar no deck atual? (regras rígidas)
function permitida(carta, deck, a) {
	if (deck.some(c => c.id === carta.id)) return false;
	if (tem(carta, "CH") && a.campeoes >= 1) return false;
	if (tem(carta, "W") && a.vitoria >= 2) return false;
	if (carta.tipo === "feitico" && !tem(carta, "W") && a.feiticos >= 3) return false;
	if (carta.elixir >= 6 && a.caras >= 2) return false;
	// Segunda condição de vitória só se combinar com a primeira.
	if (tem(carta, "W") && a.vitoria === 1) {
		const atual = deck.find(c => tem(c, "W"));
		if (sinergia(atual.id, carta.id) < 2 || carta.elixir >= 6) return false;
	}
	return true;
}

// Pontua o quanto uma carta ajuda o deck atual.
function pontuar(carta, deck, a, estilo, faltam) {
	let p = 0;

	// 1) Funções que ainda faltam
	if (tem(carta, "W")) p += a.vitoria === 0 ? 7 : 0.5;
	if (tem(carta, "SS") && a.feiticoLeve === 0) p += 5;
	if (tem(carta, "SB") && a.feiticoPesado === 0) p += 4;
	if (carta.tipo === "feitico" && !tem(carta, "SS") && !tem(carta, "SB") && !tem(carta, "W")) p -= 1;
	if (carta.tipo !== "feitico" && tem(carta, "A")) p += a.aereo < 2 ? 4 : a.aereo < 3 ? 1 : 0;
	if (tem(carta, "S")) p += a.area < 1 ? 3 : a.area < 2 ? 1 : 0;
	if (tem(carta, "K")) p += a.mataTanque < 1 ? 3 : 0;
	if ((tem(carta, "B") && !tem(carta, "W")) || tem(carta, "MT")) p += a.defesa < 1 ? 2.5 : 0;
	if (tem(carta, "C")) p += a.ciclo < 1 ? 2 : a.ciclo < 2 ? 0.5 : 0;
	if (tem(carta, "R") && a.reset === 0) p += 0.5;

	// 2) Excessos
	if (tem(carta, "T") && a.tanques >= 1) p -= 3;
	if (carta.tipo === "construcao" && a.construcoes >= 1) p -= 3;

	// 3) Sinergia com as cartas já escolhidas
	for (const c of deck) p += sinergia(c.id, carta.id) * 1.6;

	// 4) Ajuste de elixir: média projetada se o restante seguir o alvo
	const soma = deck.reduce((s, c) => s + c.elixir, 0) + carta.elixir;
	const projetada = (soma + estilo.alvo * (faltam - 1)) / TAMANHO_DECK;
	p -= Math.abs(projetada - estilo.alvo) * estilo.peso;

	// 5) Um pouco de aleatoriedade para variar os decks
	p += Math.random() * 2.5;
	return p;
}

// Escolhe uma carta entre as melhores, com sorteio ponderado.
function escolher(candidatas) {
	candidatas.sort((x, y) => y.p - x.p);
	const top = candidatas.slice(0, 4);
	const min = top[top.length - 1].p;
	const pesos = top.map(c => c.p - min + 0.5);
	let r = Math.random() * pesos.reduce((s, x) => s + x, 0);
	for (let i = 0; i < top.length; i++) {
		r -= pesos[i];
		if (r <= 0) return top[i].carta;
	}
	return top[0].carta;
}

function montarDeck(fixas, banidas, estilo) {
	const deck = [...fixas];
	while (deck.length < TAMANHO_DECK) {
		const a = analisarDeck(deck);
		const faltam = TAMANHO_DECK - deck.length;
		const candidatas = [];
		for (const carta of CARTAS) {
			if (banidas.has(carta.id) || !permitida(carta, deck, a)) continue;
			candidatas.push({ carta, p: pontuar(carta, deck, a, estilo, faltam) });
		}
		if (candidatas.length === 0) return null;
		deck.push(escolher(candidatas));
	}
	return deck;
}

// Avalia o deck pronto: lista de verificações e nota de 0 a 100.
function avaliarDeck(deck, estilo) {
	const a = analisarDeck(deck);
	const media = mediaElixir(deck);
	const checks = [
		{ ok: a.vitoria >= 1, texto: "Condição de vitória" },
		{ ok: a.feiticoLeve >= 1, texto: "Feitiço leve" },
		{ ok: a.feiticoPesado >= 1, texto: "Feitiço pesado" },
		{ ok: a.aereo >= 2, texto: "2+ cartas antiaéreas" },
		{ ok: a.area >= 1, texto: "Dano em área" },
		{ ok: a.mataTanque >= 1, texto: "Mata-tanque" },
		{ ok: a.defesa >= 1, texto: "Defesa (construção/mini-tanque)" },
		{ ok: a.ciclo >= 1, texto: "Carta de ciclo" },
		{ ok: media >= estilo.min - 0.05 && media <= estilo.max + 0.05, texto: "Elixir no estilo escolhido" },
	];

	const pares = [];
	for (let i = 0; i < deck.length; i++)
		for (let j = i + 1; j < deck.length; j++) {
			const s = sinergia(deck[i].id, deck[j].id);
			if (s) pares.push({ a: deck[i], b: deck[j], peso: s });
		}
	pares.sort((x, y) => y.peso - x.peso);

	const pontosSinergia = Math.min(pares.reduce((s, p) => s + p.peso, 0), 12);
	const nota = Math.round((checks.filter(c => c.ok).length / checks.length) * 75 + (pontosSinergia / 12) * 25);
	return { checks, pares, nota, media, ciclo: cicloDe4(deck) };
}

// Função de cada carta dentro do deck (para explicar a escolha).
function funcaoNoDeck(carta) {
	if (tem(carta, "W")) return "Ataque principal";
	if (tem(carta, "CH")) return "Campeão";
	if (tem(carta, "SB")) return "Feitiço pesado";
	if (tem(carta, "SS")) return "Feitiço leve";
	if (carta.tipo === "feitico") return "Feitiço de suporte";
	if (tem(carta, "T")) return "Tanque";
	if (tem(carta, "B")) return "Construção defensiva";
	if (tem(carta, "K")) return "Mata-tanque";
	if (tem(carta, "A") && tem(carta, "S")) return "Antiaéreo em área";
	if (tem(carta, "A")) return "Defesa aérea";
	if (tem(carta, "S")) return "Dano em área";
	if (tem(carta, "MT")) return "Mini-tanque";
	if (tem(carta, "C")) return "Ciclo";
	return "Suporte";
}

// Ponto de entrada: gera até `quantidade` decks diferentes.
function gerarDecks({ fixas = [], banidas = [], estilo = "qualquer", quantidade = 3 }) {
	const cfg = ESTILOS[estilo] || ESTILOS.qualquer;
	const cartasFixas = fixas.map(id => CARTAS_POR_ID[id]).filter(Boolean);
	const setBanidas = new Set(banidas);

	if (contar(cartasFixas, c => tem(c, "CH")) > 1)
		return { erro: "Só é permitido 1 campeão por deck." };
	if (cartasFixas.length > TAMANHO_DECK)
		return { erro: "Um deck tem no máximo 8 cartas." };

	const vistos = new Set();
	const resultados = [];
	for (let tentativa = 0; tentativa < 60 && resultados.length < quantidade * 3; tentativa++) {
		const deck = montarDeck(cartasFixas, setBanidas, cfg);
		if (!deck) continue;
		const chave = deck.map(c => c.id).sort().join(",");
		if (vistos.has(chave)) continue;
		vistos.add(chave);
		resultados.push({ deck, avaliacao: avaliarDeck(deck, cfg) });
	}
	// Gera candidatos de sobra e devolve os melhores.
	resultados.sort((x, y) => y.avaliacao.nota - x.avaliacao.nota);
	const decks = resultados.slice(0, quantidade);

	if (decks.length === 0)
		return { erro: "Não foi possível montar um deck com essas restrições. Tente remover algumas cartas excluídas." };
	return { decks };
}

if (typeof module !== "undefined") {
	module.exports = { gerarDecks, funcaoNoDeck, ESTILOS };
}
