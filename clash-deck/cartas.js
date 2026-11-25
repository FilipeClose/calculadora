// Base de cartas do gerador de decks.
// Campos: id, nome (PT-BR), en (nome em inglês), elixir, raridade, tipo, papéis.
//
// Papéis (roles):
//   W  = condição de vitória (ataca torres)   T  = tanque
//   MT = mini-tanque                          K  = mata-tanque (alto dano único)
//   A  = acerta unidades aéreas               S  = dano em área (splash)
//   SW = enxame (várias unidades)             B  = construção defensiva
//   C  = carta de ciclo (barata)              R  = reset (atordoa)
//   SS = feitiço leve                         SB = feitiço pesado
//   CH = campeão (máximo 1 por deck)

function carta(id, nome, en, elixir, raridade, tipo, papeis) {
	return { id, nome, en, elixir, raridade, tipo, papeis };
}

const CARTAS = [
	// ---------- Condições de vitória ----------
	carta("hog", "Corredor", "Hog Rider", 4, "rara", "tropa", ["W"]),
	carta("giant", "Gigante", "Giant", 5, "rara", "tropa", ["W", "T"]),
	carta("golem", "Golem", "Golem", 8, "epica", "tropa", ["W", "T"]),
	carta("royal_giant", "Gigante Real", "Royal Giant", 6, "comum", "tropa", ["W", "T"]),
	carta("balloon", "Balão", "Balloon", 5, "epica", "tropa", ["W"]),
	carta("lava_hound", "Cão de Lava", "Lava Hound", 7, "lendaria", "tropa", ["W", "T"]),
	carta("xbow", "X-Besta", "X-Bow", 6, "epica", "construcao", ["W", "B"]),
	carta("mortar", "Morteiro", "Mortar", 4, "comum", "construcao", ["W", "B", "S"]),
	carta("miner", "Mineiro", "Miner", 3, "lendaria", "tropa", ["W", "MT"]),
	carta("goblin_barrel", "Barril de Goblins", "Goblin Barrel", 3, "epica", "feitico", ["W", "SW"]),
	carta("graveyard", "Cemitério", "Graveyard", 5, "lendaria", "feitico", ["W", "SW"]),
	carta("royal_hogs", "Porcos Reais", "Royal Hogs", 5, "rara", "tropa", ["W", "SW"]),
	carta("ram_rider", "Domadora de Carneiro", "Ram Rider", 5, "lendaria", "tropa", ["W", "MT"]),
	carta("elixir_golem", "Golem de Elixir", "Elixir Golem", 3, "rara", "tropa", ["W", "T"]),
	carta("goblin_drill", "Broca de Goblin", "Goblin Drill", 4, "epica", "construcao", ["W"]),
	carta("three_musk", "Três Mosqueteiras", "Three Musketeers", 9, "rara", "tropa", ["W", "A"]),
	carta("electro_giant", "Gigante Elétrico", "Electro Giant", 7, "epica", "tropa", ["W", "T", "R"]),
	carta("skeleton_barrel", "Barril de Esqueletos", "Skeleton Barrel", 3, "comum", "tropa", ["W", "SW"]),
	carta("wall_breakers", "Quebra-Muros", "Wall Breakers", 2, "epica", "tropa", ["W", "C"]),
	carta("goblin_giant", "Gigante Goblin", "Goblin Giant", 6, "epica", "tropa", ["W", "T", "A"]),
	carta("battle_ram", "Aríete de Batalha", "Battle Ram", 4, "rara", "tropa", ["W"]),
	carta("elite_barbs", "Bárbaros de Elite", "Elite Barbarians", 6, "comum", "tropa", ["W", "K"]),

	// ---------- Feitiços ----------
	carta("zap", "Zap", "Zap", 2, "comum", "feitico", ["SS", "R"]),
	carta("log", "Tronco", "The Log", 2, "lendaria", "feitico", ["SS"]),
	carta("arrows", "Flechas", "Arrows", 3, "comum", "feitico", ["SS"]),
	carta("snowball", "Bola de Neve", "Giant Snowball", 2, "comum", "feitico", ["SS"]),
	carta("barb_barrel", "Barril de Bárbaro", "Barbarian Barrel", 2, "epica", "feitico", ["SS"]),
	carta("goblin_curse", "Maldição Goblin", "Goblin Curse", 2, "epica", "feitico", ["SS"]),
	carta("royal_delivery", "Entrega Real", "Royal Delivery", 3, "comum", "feitico", ["SS"]),
	carta("tornado", "Tornado", "Tornado", 3, "epica", "feitico", ["SS"]),
	carta("earthquake", "Terremoto", "Earthquake", 3, "rara", "feitico", ["SB"]),
	carta("fireball", "Bola de Fogo", "Fireball", 4, "rara", "feitico", ["SB"]),
	carta("poison", "Veneno", "Poison", 4, "epica", "feitico", ["SB"]),
	carta("void", "Vazio", "Void", 3, "epica", "feitico", ["SB"]),
	carta("rocket", "Foguete", "Rocket", 6, "rara", "feitico", ["SB"]),
	carta("lightning", "Relâmpago", "Lightning", 6, "epica", "feitico", ["SB", "R"]),
	carta("freeze", "Congelar", "Freeze", 4, "epica", "feitico", []),
	carta("rage", "Fúria", "Rage", 2, "epica", "feitico", []),

	// ---------- Tropas ----------
	carta("knight", "Cavaleiro", "Knight", 3, "comum", "tropa", ["MT"]),
	carta("valkyrie", "Valquíria", "Valkyrie", 4, "rara", "tropa", ["MT", "S"]),
	carta("musketeer", "Mosqueteira", "Musketeer", 4, "rara", "tropa", ["A"]),
	carta("wizard", "Mago", "Wizard", 5, "rara", "tropa", ["A", "S"]),
	carta("ice_wizard", "Mago de Gelo", "Ice Wizard", 3, "lendaria", "tropa", ["A", "S"]),
	carta("electro_wizard", "Mago Elétrico", "Electro Wizard", 4, "lendaria", "tropa", ["A", "R"]),
	carta("baby_dragon", "Bebê Dragão", "Baby Dragon", 4, "epica", "tropa", ["A", "S"]),
	carta("inferno_dragon", "Dragão Infernal", "Inferno Dragon", 4, "lendaria", "tropa", ["A", "K"]),
	carta("electro_dragon", "Dragão Elétrico", "Electro Dragon", 5, "epica", "tropa", ["A", "S", "R"]),
	carta("skeleton_dragons", "Dragões Esqueleto", "Skeleton Dragons", 4, "comum", "tropa", ["A", "S"]),
	carta("minions", "Servos", "Minions", 3, "comum", "tropa", ["A", "SW"]),
	carta("minion_horde", "Horda de Servos", "Minion Horde", 5, "comum", "tropa", ["A", "SW", "K"]),
	carta("mega_minion", "Megasservo", "Mega Minion", 3, "rara", "tropa", ["A", "K"]),
	carta("bats", "Morcegos", "Bats", 2, "comum", "tropa", ["A", "SW", "C"]),
	carta("skeletons", "Esqueletos", "Skeletons", 1, "comum", "tropa", ["SW", "C"]),
	carta("ice_spirit", "Espírito de Gelo", "Ice Spirit", 1, "comum", "tropa", ["A", "C"]),
	carta("fire_spirit", "Espírito de Fogo", "Fire Spirit", 1, "comum", "tropa", ["A", "S", "C"]),
	carta("electro_spirit", "Espírito Elétrico", "Electro Spirit", 1, "comum", "tropa", ["A", "R", "C"]),
	carta("heal_spirit", "Espírito Curador", "Heal Spirit", 1, "rara", "tropa", ["A", "C"]),
	carta("goblins", "Goblins", "Goblins", 2, "comum", "tropa", ["SW", "C"]),
	carta("spear_goblins", "Goblins Lanceiros", "Spear Goblins", 2, "comum", "tropa", ["A", "SW", "C"]),
	carta("goblin_gang", "Gangue de Goblins", "Goblin Gang", 3, "comum", "tropa", ["A", "SW"]),
	carta("skarmy", "Exército de Esqueletos", "Skeleton Army", 3, "epica", "tropa", ["SW", "K"]),
	carta("guards", "Guardas", "Guards", 3, "epica", "tropa", ["SW"]),
	carta("archers", "Arqueiras", "Archers", 3, "comum", "tropa", ["A"]),
	carta("dart_goblin", "Goblin Dardeiro", "Dart Goblin", 3, "rara", "tropa", ["A"]),
	carta("firecracker", "Pirotécnica", "Firecracker", 3, "comum", "tropa", ["A", "S"]),
	carta("princess", "Princesa", "Princess", 3, "lendaria", "tropa", ["A", "S"]),
	carta("magic_archer", "Arqueiro Mágico", "Magic Archer", 4, "lendaria", "tropa", ["A"]),
	carta("hunter", "Caçador", "Hunter", 4, "epica", "tropa", ["A", "K"]),
	carta("flying_machine", "Máquina Voadora", "Flying Machine", 4, "rara", "tropa", ["A"]),
	carta("phoenix", "Fênix", "Phoenix", 4, "lendaria", "tropa", ["A"]),
	carta("mother_witch", "Mãe Bruxa", "Mother Witch", 4, "lendaria", "tropa", ["A"]),
	carta("witch", "Bruxa", "Witch", 5, "epica", "tropa", ["A", "S", "SW"]),
	carta("executioner", "Executor", "Executioner", 5, "epica", "tropa", ["A", "S"]),
	carta("night_witch", "Bruxa Sombria", "Night Witch", 4, "lendaria", "tropa", ["SW", "K"]),
	carta("mini_pekka", "Mini P.E.K.K.A", "Mini P.E.K.K.A", 4, "rara", "tropa", ["K"]),
	carta("lumberjack", "Lenhador", "Lumberjack", 4, "lendaria", "tropa", ["K"]),
	carta("pekka", "P.E.K.K.A", "P.E.K.K.A", 7, "epica", "tropa", ["T", "K"]),
	carta("prince", "Príncipe", "Prince", 5, "epica", "tropa", ["K"]),
	carta("dark_prince", "Príncipe das Trevas", "Dark Prince", 4, "epica", "tropa", ["MT", "S"]),
	carta("bandit", "Bandida", "Bandit", 3, "lendaria", "tropa", ["MT"]),
	carta("royal_ghost", "Fantasma Real", "Royal Ghost", 3, "lendaria", "tropa", ["MT", "S"]),
	carta("fisherman", "Pescador", "Fisherman", 3, "lendaria", "tropa", ["MT"]),
	carta("ice_golem", "Golem de Gelo", "Ice Golem", 2, "rara", "tropa", ["MT", "C"]),
	carta("battle_healer", "Curandeira Guerreira", "Battle Healer", 4, "rara", "tropa", ["MT"]),
	carta("bowler", "Lançador", "Bowler", 5, "epica", "tropa", ["MT", "S"]),
	carta("bomber", "Bombardeiro", "Bomber", 2, "comum", "tropa", ["S", "C"]),
	carta("barbarians", "Bárbaros", "Barbarians", 5, "comum", "tropa", ["SW", "K"]),
	carta("mega_knight", "Megacavaleiro", "Mega Knight", 7, "lendaria", "tropa", ["T", "S"]),
	carta("giant_skeleton", "Esqueleto Gigante", "Giant Skeleton", 6, "epica", "tropa", ["T", "S"]),
	carta("sparky", "Sparky", "Sparky", 6, "lendaria", "tropa", ["S", "K"]),
	carta("royal_recruits", "Recrutas Reais", "Royal Recruits", 7, "comum", "tropa", ["T", "SW"]),

	// ---------- Campeões ----------
	carta("golden_knight", "Cavaleiro Dourado", "Golden Knight", 4, "campeao", "tropa", ["CH", "MT"]),
	carta("archer_queen", "Rainha Arqueira", "Archer Queen", 5, "campeao", "tropa", ["CH", "A", "K"]),
	carta("skeleton_king", "Rei Esqueleto", "Skeleton King", 4, "campeao", "tropa", ["CH", "MT", "S"]),
	carta("mighty_miner", "Mineiro Poderoso", "Mighty Miner", 4, "campeao", "tropa", ["CH", "MT", "K"]),
	carta("monk", "Monge", "Monk", 5, "campeao", "tropa", ["CH", "MT"]),
	carta("little_prince", "Pequeno Príncipe", "Little Prince", 3, "campeao", "tropa", ["CH", "A"]),

	// ---------- Construções ----------
	carta("cannon", "Canhão", "Cannon", 3, "comum", "construcao", ["B"]),
	carta("tesla", "Tesla", "Tesla", 4, "comum", "construcao", ["B", "A"]),
	carta("inferno_tower", "Torre Inferno", "Inferno Tower", 5, "rara", "construcao", ["B", "A", "K"]),
	carta("bomb_tower", "Torre de Bombas", "Bomb Tower", 4, "rara", "construcao", ["B", "S"]),
	carta("goblin_cage", "Jaula de Goblin", "Goblin Cage", 4, "rara", "construcao", ["B", "MT"]),
	carta("tombstone", "Lápide", "Tombstone", 3, "rara", "construcao", ["B", "SW"]),
	carta("furnace", "Fornalha", "Furnace", 4, "rara", "construcao", ["B", "A", "S"]),
	carta("goblin_hut", "Cabana de Goblins", "Goblin Hut", 5, "rara", "construcao", ["B", "A"]),
	carta("elixir_collector", "Coletor de Elixir", "Elixir Collector", 6, "comum", "construcao", []),
];

// Sinergias conhecidas entre pares de cartas (peso 1 = boa, 2 = muito boa, 3 = clássica).
// A relação é simétrica: basta listar o par uma vez.
const SINERGIAS = [
	// Corredor
	["hog", "earthquake", 3], ["hog", "ice_spirit", 2], ["hog", "fireball", 2], ["hog", "log", 2],
	["hog", "musketeer", 2], ["hog", "valkyrie", 2], ["hog", "cannon", 2], ["hog", "skeletons", 2],
	["hog", "ice_golem", 2], ["hog", "tesla", 1], ["hog", "firecracker", 1],
	// Gigante
	["giant", "musketeer", 2], ["giant", "mini_pekka", 2], ["giant", "dark_prince", 2], ["giant", "witch", 2],
	["giant", "graveyard", 3], ["giant", "electro_wizard", 2], ["giant", "sparky", 3], ["giant", "prince", 2],
	// Golem
	["golem", "night_witch", 3], ["golem", "baby_dragon", 3], ["golem", "lumberjack", 3], ["golem", "lightning", 2],
	["golem", "tornado", 2], ["golem", "mega_minion", 2], ["golem", "electro_dragon", 2], ["golem", "elixir_collector", 2],
	// Gigante Real
	["royal_giant", "fisherman", 3], ["royal_giant", "hunter", 2], ["royal_giant", "lightning", 2],
	["royal_giant", "electro_spirit", 2], ["royal_giant", "mother_witch", 2], ["royal_giant", "phoenix", 2],
	["royal_giant", "royal_ghost", 2], ["royal_giant", "furnace", 1],
	// Balão
	["balloon", "lumberjack", 3], ["balloon", "freeze", 3], ["balloon", "rage", 2], ["balloon", "lava_hound", 3],
	["balloon", "miner", 3], ["balloon", "bowler", 2], ["balloon", "ice_golem", 2], ["balloon", "barb_barrel", 2],
	["balloon", "tornado", 1], ["balloon", "giant", 2],
	// Cão de Lava
	["lava_hound", "minions", 2], ["lava_hound", "mega_minion", 2], ["lava_hound", "inferno_dragon", 2],
	["lava_hound", "skeleton_dragons", 2], ["lava_hound", "fireball", 2], ["lava_hound", "zap", 2],
	["lava_hound", "guards", 2], ["lava_hound", "tombstone", 2], ["lava_hound", "flying_machine", 1],
	["lava_hound", "arrows", 1],
	// X-Besta / Morteiro
	["xbow", "tesla", 3], ["xbow", "archers", 2], ["xbow", "knight", 2], ["xbow", "log", 2],
	["xbow", "fireball", 2], ["xbow", "skeletons", 2], ["xbow", "ice_spirit", 2], ["xbow", "rocket", 1],
	["mortar", "archers", 2], ["mortar", "knight", 2], ["mortar", "dart_goblin", 2], ["mortar", "goblin_gang", 2],
	["mortar", "spear_goblins", 2], ["mortar", "miner", 2], ["mortar", "rocket", 1], ["mortar", "skeleton_king", 2],
	// Mineiro
	["miner", "poison", 3], ["miner", "wall_breakers", 3], ["miner", "bomb_tower", 2], ["miner", "valkyrie", 2],
	["miner", "bats", 2], ["miner", "magic_archer", 2], ["miner", "inferno_tower", 2], ["miner", "spear_goblins", 2],
	["miner", "skeletons", 2], ["miner", "mega_knight", 2],
	// Barril de Goblins (Bait)
	["goblin_barrel", "princess", 3], ["goblin_barrel", "goblin_gang", 3], ["goblin_barrel", "log", 3],
	["goblin_barrel", "rocket", 2], ["goblin_barrel", "inferno_tower", 2], ["goblin_barrel", "knight", 2],
	["goblin_barrel", "ice_spirit", 2], ["goblin_barrel", "dart_goblin", 2], ["goblin_barrel", "skarmy", 2],
	["goblin_barrel", "wall_breakers", 2], ["goblin_barrel", "goblin_drill", 2], ["goblin_barrel", "skeleton_barrel", 2],
	// Cemitério
	["graveyard", "poison", 3], ["graveyard", "baby_dragon", 2], ["graveyard", "tornado", 2],
	["graveyard", "ice_wizard", 2], ["graveyard", "knight", 2], ["graveyard", "bowler", 2],
	["graveyard", "barb_barrel", 2], ["graveyard", "freeze", 2],
	// Porcos Reais / Recrutas
	["royal_hogs", "earthquake", 3], ["royal_hogs", "fireball", 2], ["royal_hogs", "royal_recruits", 3],
	["royal_hogs", "flying_machine", 2], ["royal_hogs", "goblin_cage", 2],
	["royal_recruits", "flying_machine", 2], ["royal_recruits", "fireball", 2],
	// Domadora de Carneiro
	["ram_rider", "bandit", 2], ["ram_rider", "snowball", 2], ["ram_rider", "dark_prince", 2],
	["ram_rider", "electro_wizard", 2],
	// Golem de Elixir
	["elixir_golem", "battle_healer", 3], ["elixir_golem", "night_witch", 2], ["elixir_golem", "electro_dragon", 2],
	["elixir_golem", "rage", 2], ["elixir_golem", "baby_dragon", 2],
	// Broca de Goblin
	["goblin_drill", "wall_breakers", 2], ["goblin_drill", "bomber", 2], ["goblin_drill", "fireball", 2],
	["goblin_drill", "tesla", 1], ["goblin_drill", "knight", 1],
	// Três Mosqueteiras
	["three_musk", "elixir_collector", 3], ["three_musk", "battle_ram", 3], ["three_musk", "royal_ghost", 2],
	["three_musk", "ice_golem", 2], ["three_musk", "heal_spirit", 2], ["three_musk", "bandit", 2],
	["three_musk", "dark_prince", 2],
	// Gigante Elétrico
	["electro_giant", "tornado", 3], ["electro_giant", "lightning", 2], ["electro_giant", "bowler", 2],
	["electro_giant", "golden_knight", 1],
	// Quebra-Muros
	["wall_breakers", "magic_archer", 2], ["wall_breakers", "bandit", 2], ["wall_breakers", "royal_ghost", 2],
	["wall_breakers", "battle_ram", 2],
	// Gigante Goblin / Sparky
	["goblin_giant", "sparky", 3], ["goblin_giant", "rage", 2], ["goblin_giant", "dark_prince", 2],
	["goblin_giant", "mini_pekka", 2],
	// P.E.K.K.A / Aríete (Bridge Spam)
	["battle_ram", "pekka", 3], ["battle_ram", "bandit", 3], ["battle_ram", "royal_ghost", 3],
	["battle_ram", "electro_wizard", 2], ["battle_ram", "magic_archer", 2], ["battle_ram", "poison", 2],
	["battle_ram", "dark_prince", 2], ["battle_ram", "zap", 2],
	["pekka", "bandit", 2], ["pekka", "royal_ghost", 2], ["pekka", "electro_wizard", 3], ["pekka", "poison", 2],
	["pekka", "zap", 2], ["pekka", "minions", 1],
	// Megacavaleiro
	["mega_knight", "bats", 2], ["mega_knight", "inferno_dragon", 2], ["mega_knight", "skeleton_barrel", 2],
	["mega_knight", "zap", 1],
	// Bárbaros de Elite
	["elite_barbs", "rage", 2], ["elite_barbs", "heal_spirit", 2],
	// Campeões
	["archer_queen", "giant", 2], ["archer_queen", "royal_giant", 2], ["golden_knight", "hog", 1],
	["skeleton_king", "graveyard", 2], ["mighty_miner", "earthquake", 2], ["monk", "royal_giant", 1],
	["little_prince", "giant", 1],
];

// Mapa id -> carta e mapa de sinergias para consulta rápida.
const CARTAS_POR_ID = Object.fromEntries(CARTAS.map(c => [c.id, c]));
const MAPA_SINERGIA = {};
for (const [a, b, peso] of SINERGIAS) {
	(MAPA_SINERGIA[a] = MAPA_SINERGIA[a] || {})[b] = peso;
	(MAPA_SINERGIA[b] = MAPA_SINERGIA[b] || {})[a] = peso;
}

function sinergia(a, b) {
	return (MAPA_SINERGIA[a] && MAPA_SINERGIA[a][b]) || 0;
}

// Permite usar os mesmos dados no Node (para testes).
if (typeof module !== "undefined") {
	module.exports = { CARTAS, CARTAS_POR_ID, SINERGIAS, sinergia };
}
