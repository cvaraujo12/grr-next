'use client';

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Ajuda</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Como usar o Pomodoro</h2>
            <p className="text-gray-600">
              O método Pomodoro é uma técnica de gerenciamento de tempo que usa um cronômetro para dividir o trabalho em intervalos de 25 minutos, separados por pequenas pausas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Gerenciando Metas</h2>
            <p className="text-gray-600">
              Crie e acompanhe suas metas diárias, semanais e mensais. Você pode adicionar, editar e marcar metas como concluídas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Suporte</h2>
            <p className="text-gray-600">
              Precisa de ajuda? Entre em contato conosco através do e-mail: suporte@meuprojeto.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
