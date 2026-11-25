// Interface do gerador de decks.

const ICONES = { tropa: "⚔️", feitico: "✨", construcao: "🏰" };
const LIMITE_FIXAS = 4;

const estado = {
	fixas: [],
	excluidas: new Set(carregarExcluidas()),
	modo: "fixar",
	filtro: "todos",
	busca: "",
};

let timerAviso;
function aviso(msg) {
	const el = document.getElementById("aviso");
	el.textContent = msg;
	el.hidden = false;
	clearTimeout(timerAviso);
	timerAviso = setTimeout(() => (el.hidden = true), 3500);
}

function carregarExcluidas() {
	try { return JSON.parse(localStorage.getItem("cr-excluidas") || "[]"); } catch { return []; }
}
function salvarExcluidas() {
	try { localStorage.setItem("cr-excluidas", JSON.stringify([...estado.excluidas])); } catch { }
}

// Remove acentos para a busca funcionar com "balao" ou "Balão".
function normalizar(t) {
	return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function criarCarta(carta, extra = "") {
	const el = document.createElement("button");
	el.type = "button";
	el.className = `carta ${carta.raridade}`;
	el.title = `${carta.nome} (${carta.en}) — ${carta.elixir} de elixir`;
	el.dataset.id = carta.id;
	const icone = carta.raridade === "campeao" ? "👑" : ICONES[carta.tipo];
	el.innerHTML = `
		<span class="elixir">${carta.elixir}</span>
		<span class="miolo">
			<span class="icone">${icone}</span>
			<span class="nome">${carta.nome}</span>
			${extra ? `<span class="funcao">${extra}</span>` : ""}
		</span>`;
	return el;
}

function passaFiltro(carta) {
	const f = estado.filtro;
	if (f === "W" && !carta.papeis.includes("W")) return false;
	if (f === "campeao" && carta.raridade !== "campeao") return false;
	if (["tropa", "feitico", "construcao"].includes(f) && carta.tipo !== f) return false;
	if (estado.busca) {
		const b = normalizar(estado.busca);
		if (!normalizar(carta.nome).includes(b) && !normalizar(carta.en).includes(b)) return false;
	}
	return true;
}

function renderColecao() {
	const grade = document.getElementById("colecao");
	grade.innerHTML = "";
	const lista = CARTAS.filter(passaFiltro).sort((a, b) => a.elixir - b.elixir || a.nome.localeCompare(b.nome));
	for (const carta of lista) {
		const el = criarCarta(carta);
		if (estado.fixas.includes(carta.id)) el.classList.add("fixa");
		if (estado.excluidas.has(carta.id)) el.classList.add("excluida");
		el.addEventListener("click", () => clicarCarta(carta.id));
		grade.appendChild(el);
	}
	if (lista.length === 0) grade.innerHTML = `<p class="dica">Nenhuma carta encontrada.</p>`;
}

function renderFixas() {
	const bandeja = document.getElementById("fixas");
	bandeja.innerHTML = "";
	if (estado.fixas.length === 0) {
		bandeja.innerHTML = `<span class="vazio">Nenhuma carta fixa — clique numa carta abaixo (ou gere um deck totalmente aleatório).</span>`;
		return;
	}
	for (const id of estado.fixas) {
		const el = criarCarta(CARTAS_POR_ID[id], "clique p/ remover");
		el.addEventListener("click", () => {
			estado.fixas = estado.fixas.filter(x => x !== id);
			atualizar();
		});
		bandeja.appendChild(el);
	}
}

function clicarCarta(id) {
	if (estado.modo === "fixar") {
		if (estado.fixas.includes(id)) {
			estado.fixas = estado.fixas.filter(x => x !== id);
		} else {
			if (estado.fixas.length >= LIMITE_FIXAS) {
				aviso(`Você pode fixar no máximo ${LIMITE_FIXAS} cartas.`);
				return;
			}
			const carta = CARTAS_POR_ID[id];
			if (carta.raridade === "campeao" && estado.fixas.some(f => CARTAS_POR_ID[f].raridade === "campeao")) {
				aviso("Só é permitido 1 campeão por deck.");
				return;
			}
			estado.fixas.push(id);
			estado.excluidas.delete(id);
		}
	} else {
		if (estado.excluidas.has(id)) estado.excluidas.delete(id);
		else {
			estado.excluidas.add(id);
			estado.fixas = estado.fixas.filter(x => x !== id);
		}
		salvarExcluidas();
	}
	atualizar();
}

function atualizar() {
	renderFixas();
	renderColecao();
}

function textoDoDeck(deck, media) {
	return `Deck (${media.toFixed(1)} elixir): ` + deck.map(c => c.nome).join(", ");
}

function renderResultado(res) {
	const area = document.getElementById("resultado");
	area.innerHTML = "";
	if (res.erro) {
		area.innerHTML = `<p class="erro">${res.erro}</p>`;
		return;
	}
	res.decks.forEach(({ deck, avaliacao }, i) => {
		const box = document.createElement("article");
		box.className = "deck";
		box.innerHTML = `
			<div class="deck-topo">
				<h3>Deck ${i + 1}</h3>
				<div class="stats">
					<span class="stat">Média <b>${avaliacao.media.toFixed(1)}</b> 💧</span>
					<span class="stat">Ciclo de 4 <b>${avaliacao.ciclo}</b></span>
					<span class="stat">Nota <b>${avaliacao.nota}</b>/100</span>
				</div>
				<button class="copiar">Copiar lista</button>
			</div>
			<div class="cartas"></div>
			<div class="deck-info">
				<div><h4>Checklist</h4><ul>${avaliacao.checks.map(c => `<li class="${c.ok ? "ok" : "nao"}">${c.texto}</li>`).join("")}</ul></div>
				<div><h4>Sinergias</h4><ul>${avaliacao.pares.length
				? avaliacao.pares.slice(0, 6).map(p => `<li>${p.a.nome} + ${p.b.nome} ${"★".repeat(p.peso)}</li>`).join("")
				: "<li>Nenhuma sinergia clássica encontrada.</li>"}</ul></div>
			</div>`;

		// Cartas fixas primeiro, depois por elixir.
		const ordenado = [...deck].sort((a, b) =>
			(estado.fixas.includes(b.id) - estado.fixas.includes(a.id)) || a.elixir - b.elixir);
		const grade = box.querySelector(".cartas");
		for (const carta of ordenado) {
			const el = criarCarta(carta, funcaoNoDeck(carta));
			if (estado.fixas.includes(carta.id)) el.classList.add("fixa");
			el.tabIndex = -1;
			grade.appendChild(el);
		}

		const btn = box.querySelector(".copiar");
		btn.addEventListener("click", async () => {
			try {
				await navigator.clipboard.writeText(textoDoDeck(deck, avaliacao.media));
				btn.textContent = "Copiado!";
			} catch {
				btn.textContent = "Não foi possível copiar";
			}
			setTimeout(() => (btn.textContent = "Copiar lista"), 1500);
		});
		area.appendChild(box);
	});
	area.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Eventos
document.getElementById("busca").addEventListener("input", e => {
	estado.busca = e.target.value.trim();
	renderColecao();
});
document.querySelectorAll(".modo button").forEach(b => b.addEventListener("click", () => {
	estado.modo = b.dataset.modo;
	document.querySelectorAll(".modo button").forEach(x => x.classList.toggle("ativo", x === b));
}));
document.querySelectorAll("#filtros button").forEach(b => b.addEventListener("click", () => {
	estado.filtro = b.dataset.tipo;
	document.querySelectorAll("#filtros button").forEach(x => x.classList.toggle("ativo", x === b));
	renderColecao();
}));
document.getElementById("limparExcluidas").addEventListener("click", () => {
	estado.excluidas.clear();
	salvarExcluidas();
	renderColecao();
});
document.getElementById("gerar").addEventListener("click", () => {
	renderResultado(gerarDecks({
		fixas: estado.fixas,
		banidas: [...estado.excluidas],
		estilo: document.getElementById("estilo").value,
		quantidade: Number(document.getElementById("quantidade").value),
	}));
});

atualizar();
