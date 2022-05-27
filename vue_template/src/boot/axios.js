import axios from 'axios'

export default {
  namespaced: true,
  actions: {
    async login(login, password) {
        //パスワードが true
        axios.post('/login')
          .then(response => {
            if (true) {
            //TODO ここにログイン成功時の処理
            // ○○画面へ繊維
            } else {
            //TODO ここにログイン成功時の処理
            // login 画面へ繊維

            }
            console.log(response);
          })
          .catch(error=>
            console.log(error)
      )
    },
    async loginstatus ({ dispatch }, requests) {
        //TODO トークンの確認
    },
    async logout ( dispatch , requests) {
        //TODO ログアウト時の処理　トークンの初期化
    },

  }
}