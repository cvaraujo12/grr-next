'use client';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Configurações</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Tema</h2>
            <select className="w-full p-2 border rounded">
              <option>Claro</option>
              <option>Escuro</option>
              <option>Sistema</option>
            </select>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Notificações</h2>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Ativar notificações</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
