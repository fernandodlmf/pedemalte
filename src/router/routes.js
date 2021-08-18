import Parse from './../service/Parse'

const beforeEnter = (to, from, next) => {
    if (Parse.User.current()) {
        var email = Parse.User.current().get('email')
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        // Verifica se o usuário tem um e-mail válido como username, caso contrário provavelmente uma conta não terminada
        if (re.test(String(email).toLowerCase())) {
            next()
        } else {
            Parse.User.logOut()
            next({ name: 'tela-login' })
        }
    } else {
        next({ name: 'tela-login' })
    }
}

const routes = [
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', component: () => import('pages/Index.vue') },
        {
            path: "tela-buscar",
            component: () => import("pages/TelaBuscar.vue")
        },
        {
            path: "tela-cupons",
            component: () => import("src/pages/TelaCupons.vue"),
            beforeEnter
        },
        {
            path: "/tela-categoria-detalhes",
            name: "tela-categoria-detalhes",
            component: () => import("pages/TelaCategoriaDetalhe.vue")
        },
      ]
    },

//   {
//     path: "/",
//     component: () => import("pages/Index.vue")
//   },
  {
    path: "/produto-detalhe",
    name: "produto-detalhe",
    component: () => import("src/pages/TelaProdutoDetalhe.vue")
  },
//   {
//     path: "/tela-buscar",
//     component: () => import("pages/TelaBuscar.vue")
//   },
  {
    path: "/tela-recebimento",
    component: () => import("pages/TelaRecebimento.vue"),
    beforeEnter
  },
//   {
//     path: "/tela-categoria-detalhes",
//     name: "tela-categoria-detalhes",
//     component: () => import("pages/TelaCategoriaDetalhe.vue")
//   },
  {
    path: "/tela-pedidos",
    name: "tela-pedidos",
    component: () => import("src/pages/TelaPedidos.vue"),
    beforeEnter
  },
  {
    path: "/tela-enderecos",
    component: () => import("src/pages/TelaEnderecos.vue"),
    beforeEnter
  },

  {
    path: "/tela-endereco-adicionar",
    name: "tela-endereco-adicionar",
    component: () => import("pages/TelaEnderecoSalvar.vue"),
    beforeEnter
  },
//   {
//     path: "/tela-cupons",
//     component: () => import("src/pages/TelaCupons.vue"),
//     beforeEnter
//   },
  {
    path: "/tela-perfil",
    component: () => import("src/pages/TelaPerfil.vue"),
    beforeEnter
  },
  {
    name: "tela-login",
    path: "/tela-login",
    component: () => import("src/pages/TelaLogin.vue")
  },
  {
    path: "/tela-cadastro",
    component: () => import("src/pages/TelaCadastro.vue")
  },
  {
    path: "/tela-favoritos",
    component: () => import("src/pages/TelaFavoritos.vue"),
    beforeEnter
  },
  {
    path: "/tela-ajuda",
    component: () => import("src/pages/TelaAjuda.vue"),
    beforeEnter
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes
