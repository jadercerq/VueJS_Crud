<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="ticker">Ticker</label>
        <input
          type="text"
          class="form-control"
          id="ticker"
          required
          v-model="acao.ticker"
          name="ticker"
        />
      </div>

      <div class="form-group">
        <label for="empresa">Empresa</label>
        <input
          class="form-control"
          id="empresa"
          required
          v-model="acao.empresa"
          name="empresa"
        />
      </div>

      <div class="form-group">
        <label for="setor">Setor</label>
        <input
          class="form-control"
          id="setor"
          required
          v-model="acao.setor"
          name="setor"
        />
      </div>

      <button @click="saveAcao" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newAcao">Add</button>
    </div>
  </div>
</template>

<script>
import AcaoDataService from "../services/AcaoDataService";

export default {
  name: "add-acao",
  data() {
    return {
      acao: {
        id: null,
        ticker: "",
        empresa: "",
        setor: "",
        entrada: "",
        alvo: "",
        inWallet: false,
        target: false
      },
      submitted: false
    };
  },
  methods: {
    saveAcao() {
      var data = {
        ticker: this.acao.ticker,
        empresa: this.acao.empresa,
        setor: this.acao.setor
      };

      AcaoDataService.create(data)
        .then(response => {
          this.acao.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newAcao() {
      this.submitted = false;
      this.acao = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
