/**
 * Nível Master: Motor de Autorização Médica
 */
function autorizar(
  fraudeDetectada,
  diasAtraso,
  ehEmergencia,
  diasPlano,
  tipoProcedimento,
  tipoPlano,
  idade,
  foraDaRede,
  valor,
) {
  
  
  // SUA LÓGICA AQUI
  // Dica: Usem Guard Clauses (if... return) para matar as regras mais fortes primeiro.
  
    if(fraudeDetectada){
      return "BLOQUEADO";
    }
    if(diasAtraso > 60){
      return "SUSPENSO";
    }
    if (ehEmergencia){
      return "AUTORIZADO"
    }
    if(diasPlano < 30 && tipoProcedimento === "ROTINA"){
      return "NEGADO";
    }
    if(diasPlano < 180 && tipoProcedimento === "CIRURGIA"){
      return "NEGADO";
    }
    if(tipoProcedimento === "ESTETICA" && tipoPlano === "BASICO"){
        return "NEGADO";
    }
    if(idade > 65 && tipoProcedimento === "ALTO_RISCO"){
      return "AUDITORIA";
    }
    if(foraDaRede && tipoPlano === "BASICO"){
      return "NEGADO";
    }
    if(valor > 15000 && tipoPlano === "BASICO"){
      return "AUDITORIA";
    }
    return "AUTORIZADO";
   
}

// 🧪 Bateria de Testes Oficiais (O código deve passar em todos!)

// 1. Fraude sempre bloqueia
console.log(autorizar(true, 0, true, 500, "ROTINA", "PREMIUM", 30, false, 100)); // BLOQUEADO

// 2. Inadimplência suspende
console.log(
  autorizar(false, 65, false, 500, "ROTINA", "BASICO", 30, false, 100),
); // SUSPENSO

// 3. Emergência salva da carência
console.log(
  autorizar(false, 0, true, 10, "CIRURGIA", "BASICO", 40, true, 5000),
); // AUTORIZADO

// 4. Carência Rotina
console.log(autorizar(false, 0, false, 20, "ROTINA", "BASICO", 25, false, 150)); // NEGADO

// 5. Carência Cirurgia
console.log(
  autorizar(false, 0, false, 100, "CIRURGIA", "PREMIUM", 45, false, 8000),
); // NEGADO

// 6. Estética no Básico
console.log(
  autorizar(false, 0, false, 300, "ESTETICA", "BASICO", 30, false, 2000),
); // NEGADO

// 7. Risco por Idade
console.log(
  autorizar(false, 0, false, 400, "ALTO_RISCO", "PREMIUM", 70, false, 5000),
); // AUDITORIA

// 8. Fora da rede no Básico
console.log(autorizar(false, 0, false, 500, "ROTINA", "BASICO", 35, true, 300)); // NEGADO

// 9. Trava Financeira no Básico
console.log(
  autorizar(false, 0, false, 500, "CIRURGIA", "BASICO", 50, false, 16000),
); // AUDITORIA

// 10. Tudo certo - Premium fora da rede
console.log(
  autorizar(false, 0, false, 300, "ROTINA", "PREMIUM", 30, true, 500),
); // AUTORIZADO
