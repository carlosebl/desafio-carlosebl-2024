class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: "savana", tamanhoTotal: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
        { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: [] },
        { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
        { numero: 4, bioma: "rio", tamanhoTotal: 8, animais: [] },
        { numero: 5, bioma: "savana", tamanhoTotal: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
      ];
  
      this.animais = [
        { especie: "LEAO", tamanho: 3, bioma: ["savana"], carnivoro: true },
        { especie: "LEOPARDO", tamanho: 2, bioma: ["savana"], carnivoro: true },
        { especie: "CROCODILO", tamanho: 3, bioma: ["rio"], carnivoro: true },
        { especie: "MACACO", tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
        { especie: "GAZELA", tamanho: 2, bioma: ["savana"], carnivoro: false },
        { especie: "HIPOPOTAMO", tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
      ];
    }
  
    analisaRecintos(especie, quantidade) {
      const animal = this.animais.find(a => a.especie === especie);
      if (!animal) return { erro: "Animal inválido" };
      if (quantidade <= 0) return { erro: "Quantidade inválida" };
  
      const recintosViaveis = this.recintos
        .filter(recinto => {
          // Verificar se o bioma é adequado
          const biomasRecinto = recinto.bioma.split(" e ");
          const biomaAdequado = biomasRecinto.some(bioma => animal.bioma.includes(bioma));
          if (!biomaAdequado) return false;
  
          const espacoOcupadoAtual = recinto.animais.reduce((total, a) => {
            const animalExistente = this.animais.find(an => an.especie === a.especie);
            return total + (animalExistente ? animalExistente.tamanho * a.quantidade : 0);
          }, 0);
  
          // Calcular o espaço necessário considerando a regra de 1 espaço extra
          const espacoNecessario = (animal.tamanho * quantidade) + (recinto.animais.length > 0 ? 1 : 0);
  
          // Verificar se há espaço suficiente
          const espacoDisponivel = recinto.tamanhoTotal - espacoOcupadoAtual;
          if (espacoDisponivel < espacoNecessario) return false;
  
          // Verificar se o animal é carnívoro e se já há outras espécies no recinto
          if (animal.carnivoro && recinto.animais.length > 0 && recinto.animais[0].especie !== especie) {
            return false;
          }
  
          // Regra para hipopótamos
          if (animal.especie === "HIPOPOTAMO" && recinto.bioma !== "savana e rio") {
            return false;
          }
  
          // Regra para macacos
          if (animal.especie === "MACACO" && recinto.animais.length === 0) {
            return false;
          }
  
          return true;
        })
        .map(recinto => {
          const espacoOcupadoAtual = recinto.animais.reduce((total, a) => {
            const animalExistente = this.animais.find(an => an.especie === a.especie);
            return total + (animalExistente ? animalExistente.tamanho * a.quantidade : 0);
          }, 0);
          const espacoDisponivel = recinto.tamanhoTotal - espacoOcupadoAtual - (recinto.animais.length > 0 ? 1 : 0);
          return `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total: ${recinto.tamanhoTotal})`;
        });
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis };
    }
  }
  
  export { RecintosZoo };
  