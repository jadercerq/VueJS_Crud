<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Digite o ticker"
          v-model="ticker"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTicker"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Lista de Ações</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(acao, index) in acoes"
          :key="index"
          @click="setActiveAcao(acao, index)"
        >
          {{ acao.ticker }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllAcoes">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentAcao">
        <h4>Acao</h4>
        <div>
          <label><strong>Ticker:</strong></label> {{ currentAcao.ticker }}
        </div>
        <div>
          <label><strong>Empresa:</strong></label> {{ currentAcao.empresa }}
        </div>
        <div>
          <label><strong>Setor:</strong></label> {{ currentAcao.setor }}
        </div>

        <a class="badge badge-warning"
          :href="'/acoes/' + currentAcao.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Acao...</p>
      </div>
    </div>
  </div>
</template>

<script>
import AcaoDataService from "../services/AcaoDataService";

export default {
  name: "acoes-list",
  data() {
    return {
      acoes: [],
      currentAcao: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveAcoes() {
      AcaoDataService.getAll()
        .then(response => {
          this.acoes = response.data;
          //console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveAcoes();
      this.currentAcao = null;
      this.currentIndex = -1;
    },

    setActiveAcao(acao, index) {
      this.currentAcao = acao;
      this.currentIndex = index;
    },

    removeAllAcoes() {
      AcaoDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTicker() {
      AcaoDataService.findByTicker(this.ticker)
        .then(response => {
          this.acoes = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveAcoes();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
