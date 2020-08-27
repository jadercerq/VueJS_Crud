<template>
  <div v-if="currentAcao" class="edit-form">
    <h4>Acao</h4>
    <form>
      <div class="form-group">
        <label for="ticker">Ticker</label>
        <input type="text" class="form-control" id="ticker"
          v-model="currentAcao.ticker"
        />
      </div>
      <div class="form-group">
        <label for="empresa">Empresa</label>
        <input type="text" class="form-control" id="empresa"
          v-model="currentAcao.empresa"
        />
      </div>
      <div class="form-group">
        <label for="setor">Setor</label>
        <input type="text" class="form-control" id="setor"
          v-model="currentAcao.setor"
        />
      </div>

      <div class="form-group">
        <label><strong>Na carteira:</strong></label>
        {{ currentAcao.inWallet ? "Sim" : "Não" }}
      </div>
      <div class="form-group">
        <label><strong>Prioridade:</strong></label>
        {{ currentAcao.target ? "Sim" : "Não" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentAcao.published"
      @click="updateInWallet(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updateInWallet(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteAcao"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateAcao"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Acao...</p>
  </div>
</template>

<script>
import AcaoDataService from "../services/AcaoDataService";

export default {
  name: "acao",
  data() {
    return {
      currentAcao: null,
      message: ''
    };
  },
  methods: {
    getAcao(id) {
      AcaoDataService.get(id)
        .then(response => {
          this.currentAcao = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateInWallet(status) {
      var data = {
        id: this.currentAcao.id,
        ticker: this.currentAcao.ticker,
        empresa: this.currentAcao.empresa,
        setor: this.currentAcao.setor,
        published: status
      };

      AcaoDataService.update(this.currentAcao.id, data)
        .then(response => {
          this.currentAcao.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateAcao() {
      AcaoDataService.update(this.currentAcao.id, this.currentAcao)
        .then(response => {
          console.log(response.data);
          this.message = 'Cadastro efetuado com sucesso!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteAcao() {
      AcaoDataService.delete(this.currentAcao.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "acoes" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getAcao(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
