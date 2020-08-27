import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/acoes",
      name: "acoes",
      component: () => import("./components/AcoesList")
    },
    {
      path: "/acoes/:id",
      name: "acoes-detalhe",
      component: () => import("./components/Acao")
    },
    {
      path: "/adicionar",
      name: "adicionar",
      component: () => import("./components/AdicionarAcao")
    }
  ]
});
