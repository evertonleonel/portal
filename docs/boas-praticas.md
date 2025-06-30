# ESTRUTURA DE PASTAS

src/
├── \_msw/ # Configurações de testes para MSW
├── assets/ # Imagens, fontes, ícones, arquivos estáticos
├── components/ # Componentes reutilizáveis da UI
│ ├── layouts/ # Layouts para estruturar páginas (ex: AuthLayout)
│ │ └── auth/
│ │ └── index.tsx # Exportação do componente
│ ├── ui/ # Componentes base, sem estado (apenas apresentação)
│ │ └── button/
│ │ └── index.tsx # Exportação do componente
│ ├── card/ # Exemplos de compound components
│ │ └── index.tsx
│ └── ux/ # Componentes que possuem estado e lógica de experiência
│ └── ...
├── hooks/ # Hooks customizados
├── pages/ # Páginas da aplicação
│ ├── home/
│ │ └── page.tsx # Página Home
│ ├── login/
│ │ └── page.tsx # Página Login
│ └── ...
├── context/ lógica de contexto global / reutilizável
├── guard/ Componentes para permissões de visualização de rotas e conteúdos
├── routes/ Rotas públicas e privadas
├── services/ # APIs, clientes HTTP, lógica de negócio externa
├── theme/ # Arquivos globais de CSS/SCSS ou Tailwind config
├── utils/ # Funções utilitárias, helpers
└── main.tsx # Componente raiz da aplicação

## Como criar páginas

As páginas devem ser exportadas como **default functions**:

```tsx
// src/pages/home/page.tsx
export default function Home() {
  return <div>...</div>;
}
```

## Como criar componentes

Os componentes devem ser exportados como named exports usando arrow functions:

```tsx
// src/components/button/index.tsx
export const Button = () => {
  return <button>...</button>;
};
```

Os componentes base (ui) devem ser criados utilizando o padrão compound components, para permitir composição:

```tsx
// src/components/card/index.tsx
type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => {
  return <div>{children}</div>;
};

const CardHeader = () => {
  return <div />;
};

export { Card, CardHeader };
```

## Consistência em componentes de estado

```tsx
//constants
const value = 1000;

const ConsistentComponentDesign = () => {
  // state
  const [state, setState] = useState(true);

  // functions
  const handleClick = () => {
    setState(prev => !prev);
  };

  //sideEffects
  useEffect(() => {
    console.log(state, 'state');
  }, [state]);

  return (
    <div>
      <h1>Good component design!</h1>
      <div>{value}</div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};
```

## Regras importantes

- **Sempre** desestruture as propriedades dos componentes e páginas;
- **Páginas** ficam dentro da pasta `pages/` em subpastas com o arquivo principal chamado `page.tsx`.
- **Componentes** ficam em `components/`, organizados em pastas próprias, exportados via `index.tsx`.
- _Componentes UI_ - ficam em `components/ui/`. focados em apresentação, não possuem estado; devem preferencialmente usar o padrão compound component para máxima reutilização.
- _Componentes UX_ ficam em `components/ux/`. possuem estado e lógica de experiência do usuário;
- **Layouts** ficam em `/components/_layouts/`. definem a estrutura persistente das páginas.
- **Hooks** customizados ficam em `hooks/`.
- **Services** concentram chamadas de API e regras de negócio externas.
- **Utils** contém funções auxiliares e utilitárias genéricas.
