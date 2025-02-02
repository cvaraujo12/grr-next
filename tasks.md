# Tarefas do Painel TDAH

## 1. Configuração Inicial do Projeto

- [ ] 1. Criar um novo projeto Next.js.
- [ ] 2. Escolher as opções desejadas (TypeScript, ESLint, Tailwind CSS, etc.).
- [ ] 3. Instalar as dependências.
- [ ] 4. Configurar o Tailwind CSS.
- [ ] 5. Criar o arquivo `tailwind.config.js`.
- [ ] 6. Definir a paleta de cores, tipografia e outros estilos globais com base nas imagens fornecidas.
- [ ] 7. Estruturar as pastas do projeto.
- [ ] 8. Criar as pastas `components`, `app`, `lib`, `scripts`, `public`, etc., dentro da pasta `src`.
- [ ] 9. Criar os arquivos base.
- [ ] 10. `src/lib/types.ts` para tipos compartilhados.
- [ ] 11. `src/lib/utils/shared.ts` para funções utilitárias compartilhadas.
- [ ] 12. Configurar o script `update-cursor-updates.sh`.
- [ ] 13. Criar o arquivo `scripts/update-cursor-updates.sh` com o conteúdo do script fornecido anteriormente.
- [ ] 14. Torná-lo executável (`chmod +x scripts/update-cursor-updates.sh`).
- [ ] 15. Testar o script para garantir que ele esteja atualizando o arquivo `.cursor-updates` corretamente.
- [ ] 16. Criar o arquivo `script-template.txt`.
- [ ] 17. Criar o arquivo `scripts/script-template.txt` com o conteúdo do template aprimorado fornecido anteriormente.
- [ ] 18. Criar o arquivo `insert_task.py`.
- [ ] 19. Criar o arquivo `scripts/insert_task.py` com o conteúdo do script Python fornecido anteriormente.
- [ ] 20. Torná-lo executável (`chmod +x scripts/insert_task.py`).
- [ ] 21. Criar um `tasks.md` inicial
- [ ] 22. Adicionar as tarefas desta lista.

## 2. Layout Geral

- [ ] 23. Criar o layout principal do painel usando `grid` do Tailwind CSS.
- [ ] 24. Definir as áreas para Tarefas, Notas, Metas e Pomodoro.
- [ ] 25. Garantir a responsividade do layout em diferentes tamanhos de tela (usar os prefixos `sm:`, `md:`, `lg:` do Tailwind CSS).
- [ ] 26. Criar um componente `Container` para envolver o conteúdo principal de cada seção.
- [ ] 27. Adicionar estilos para espaçamento interno (padding) e margens, se necessário.

## 3. Seção de Tarefas

- [ ] 28. Desenvolver o componente `TaskCard` para exibir uma tarefa.
- [ ] 29. Incluir título da tarefa, descrição (opcional) e status (a fazer, fazendo, concluído).
- [ ] 30. Estilizar o `TaskCard` com Tailwind CSS, seguindo o design das imagens (cantos arredondados, sombras, etc.).
- [ ] 31. Usar ícones do `lucide-react` para indicar o status da tarefa (e.g., círculo vazio para "a fazer", círculo preenchido pela metade para "fazendo", círculo preenchido para "concluído").
- [ ] 32. Implementar a funcionalidade de adicionar uma nova tarefa.
- [ ] 33. Criar um modal para o formulário de nova tarefa.
- [ ] 34. Usar o componente `Dialog` do Headless UI para o modal.
- [ ] 35. Usar o `react-hook-form` para gerenciar o formulário (título, descrição, status).
- [ ] 36. Adicionar um botão "Adicionar Tarefa" que abre o modal.
- [ ] 37. Integrar com o `react-toastify` para exibir notificações de sucesso ou erro.
- [ ] 38. Listar as tarefas existentes na seção "Tarefas".
- [ ] 39. Exibir os `TaskCard`s em uma lista vertical.
- [ ] 40. (Opcional) Adicionar funcionalidade de paginação se houver muitas tarefas.
- [ ] 41. Permitir a edição de uma tarefa existente.
- [ ] 42. Clicar em um `TaskCard` deve abrir o modal de edição com os dados da tarefa preenchidos.
- [ ] 43. Permitir a exclusão de uma tarefa.
- [ ] 44. Adicionar um botão de exclusão (e.g., um ícone de lixeira) em cada `TaskCard`.
- [ ] 45. Adicionar funcionalidade de marcar uma tarefa como concluída/a fazer/fazendo.
- [ ] 46. Clicar no ícone de status deve alternar o status da tarefa.
- [ ] 47. (Opcional) Implementar funcionalidade de arrastar e soltar para reordenar as tarefas.
- [ ] 48. Considerar usar uma biblioteca como `react-beautiful-dnd` para isso.

## 4. Seção de Notas

- [ ] 49. Desenvolver o componente `NoteCard` para exibir uma nota.
- [ ] 50. Incluir título da nota e corpo do texto.
- [ ] 51. Estilizar o `NoteCard` com Tailwind CSS, seguindo o design das imagens.
- [ ] 52. Implementar a funcionalidade de adicionar uma nova nota.
- [ ] 53. Criar um modal para o formulário de nova nota.
- [ ] 54. Usar o `Dialog` do Headless UI para o modal.
- [ ] 55. Usar o `react-hook-form` para gerenciar o formulário (título, corpo do texto).
- [ ] 56. Adicionar um botão "Adicionar Nota" que abre o modal.
- [ ] 57. Listar as notas existentes na seção "Notas".
- [ ] 58. Exibir os `NoteCard`s em uma lista vertical.
- [ ] 59. Permitir a edição de uma nota existente.
- [ ] 60. Clicar em um `NoteCard` deve abrir o modal de edição com os dados da nota preenchidos.
- [ ] 61. Permitir a exclusão de uma nota.
- [ ] 62. Adicionar um botão de exclusão em cada `NoteCard`.

## 5. Seção de Metas

- [ ] 63. Desenvolver o componente `GoalCard` para exibir uma meta.
- [ ] 64. Incluir título da meta, descrição (opcional) e data de conclusão (opcional).
- [ ] 65. Estilizar o `GoalCard` com Tailwind CSS.
- [ ] 66. Adicionar uma barra de progresso para indicar o status da meta (se aplicável).
- [ ] 67. Implementar a funcionalidade de adicionar uma nova meta.
- [ ] 68. Criar um modal para o formulário de nova meta.
- [ ] 69. Usar o `react-hook-form` para gerenciar o formulário (título, descrição, data de conclusão).
- [ ] 70. Adicionar um botão "Adicionar Meta" que abre o modal.
- [ ] 71. Listar as metas existentes na seção "Metas".
- [ ] 72. Exibir os `GoalCard`s em uma lista.
- [ ] 73. Permitir a edição de uma meta existente.
- [ ] 74. Permitir a exclusão de uma meta.
- [ ] 75. Adicionar funcionalidade de marcar uma meta como concluída.

## 6. Seção de Pomodoro

- [ ] 76. Desenvolver o componente `PomodoroTimer`.
- [ ] 77. Exibir o tempo restante em formato `mm:ss`.
- [ ] 78. Incluir botões para iniciar, pausar e resetar o timer.
- [ ] 79. Implementar a lógica do timer (25 minutos de foco, 5 minutos de pausa, com a opção de configurar esses tempos).
- [ ] 80. Usar a Context API ou Zustand para gerenciar o estado do timer e permitir que outros componentes acessem o estado atual (e.g., para exibir uma mensagem de "Em Foco" ou "Em Pausa").
- [ ] 81. Adicionar funcionalidade de áudio para notificar o final de cada período (foco e pausa).
- [ ] 82. Considerar usar a biblioteca `date-fns` ou `dayjs` para formatar o tempo.
- [ ] 83. (Opcional) Adicionar um histórico de sessões de Pomodoro concluídas.

## 7. Melhorias Futuras (Não Prioritárias Agora)

- [ ] 84. Integração com o Backend (Prisma, etc.).
- [ ] 85. Autenticação de Usuários (NextAuth.js).
- [ ] 86. Funcionalidade de Busca.
- [ ] 87. Funcionalidade de Filtragem.
- [ ] 88. Funcionalidade de Ordenação.
- [ ] 89. Adicionar funcionalidade para exportar ideias e documentação para o Notion. (mencionado no `v2.txt`)
- [ ] 90. Criar um recurso de monitoramento de cronograma de projeto. (mencionado no `v2.txt`)
- [ ] 91. Automatizar o resumo das discussões da reunião. (mencionado no `v2.txt`)
