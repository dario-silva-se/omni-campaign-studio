# Deploy na Vercel — omni-campaign-studio (frontend)

Topologia de produção: **Frontend → Gateway → API**.
O frontend chama o **gateway** para tudo: CRUD em `/api/*` (o gateway faz proxy
para a API) e login em `/_gw/auth/*`. Ele **não** fala com a API diretamente.

## Causa comum de "conexões não funcionam em produção"

`src/services/apiClient.ts` usa `baseURL: import.meta.env.VITE_API_URL ?? '/api'`.
Se `VITE_API_URL` **não** estiver definido no build da Vercel, ele cai no fallback
relativo `/api`, que em produção resolve para a **própria origem do frontend** —
onde não há API. Resultado: `/api/*` retorna 404 e `/_gw/auth/login` retorna o
`index.html` (o login quebra ao parsear HTML como JSON).

`VITE_*` é inlined **em build time** pelo Vite — defina as variáveis em
*Project Settings → Environment Variables* (escopo Production/Preview) **antes**
do build. Mudar a variável exige um novo deploy.

## Variáveis a definir na Vercel

| Variável | Valor | Obrigatória |
|---|---|---|
| `VITE_API_URL` | `https://<gateway>.vercel.app/api` | **Sim** |
| `VITE_USE_MOCKS` | `false` | Sim (já em `.env.production`) |
| `VITE_GATEWAY_URL` | *(vazio — derivado de `VITE_API_URL`)* | Não |

Substitua `<gateway>` pelo domínio real do projeto do gateway.

## Verificação pós-deploy

No DevTools do navegador, confirme que as chamadas saem para
`https://<gateway>.vercel.app/api/...` e `.../_gw/auth/...` (não para a origem do
frontend), que o login retorna JSON e que não há erro de CORS no console.
