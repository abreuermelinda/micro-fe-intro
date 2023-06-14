import { BehaviorSubject } from "rxjs";

const API_SERVER = "http://localhost:8080";

/* Exportação de uma instância da classe BehaviorSubject chamada jwt: A classe BehaviorSubject é uma implementação da biblioteca RxJS que representa um tipo de Observável que armazena o último 
valor emitido e o disponibiliza para novos observadores assim que eles se inscrevem. 
Neste caso, jwt é inicializado com o valor null e será atualizado posteriormente com um token de acesso. */
export const jwt = new BehaviorSubject(null); 
// jwt.subscribe((token) => console.log(token));
// jwt.next(newValue);

export const login = (username, password) =>
/* Nessa requisição, o método HTTP é definido como POST, e são fornecidos os cabeçalhos da requisição, 
indicando que o corpo da requisição é um JSON. O corpo da requisição é definido usando JSON.stringify() 
para transformar os parâmetros username e password em uma string JSON. */
  fetch(`${API_SERVER}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  /* Encadeamento de chamadas then para lidar com a resposta da requisição:
  A primeira chamada then converte a resposta da requisição em um objeto JSON.
  A segunda chamada then recebe o objeto JSON resultante e faz o seguinte:
    Chama o método next() do BehaviorSubject jwt, passando o valor data.acess_token. Isso atualiza 
    o valor do jwt e notifica os observadores que estão inscritos para receber atualizações.
    Retorna o valor data.acess_token (um token de acesso) para uso posterior. */
    .then((res) => res.json())
    .then((data) => {
      jwt.next(data.acess_token);
      // getCart();
      return data.acess_token;
    });
