// app/admin/(protected)/page.tsx
import { getOverviewStats, getDailyStats, getOccasionStats, getTopUsers } from '@/lib/admin-queries';
import { MetricCard } from '../_components/MetricCard';
import { BarChart } from '../_components/BarChart';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [overview, daily, occasions, topUsers] = await Promise.all([
    getOverviewStats(),
    getDailyStats(30),
    getOccasionStats(),
    getTopUsers(5),
  ]);
  return { overview, daily, occasions, topUsers };
}

export default async function DashboardPage() {
  const { overview, daily, occasions, topUsers } = await getStats();

  const userTrend = daily.map(d => ({
    label: new Date(d.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
    value: d.users,
    secondaryValue: d.generations,
    color: '#3b82f6',
    secondaryColor: '#10b981',
  }));

  const usageTrend = daily.map(d => ({
    label: new Date(d.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
    value: d.generations,
    secondaryValue: d.accepted,
    color: '#8b5cf6',
    secondaryColor: '#10b981',
  }));

  return (
    <div className="space-y-12 mb-40 ">
      {/* Header con más espacio superior */}
      <div className="pt-28">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-gray-900">Overview</h1>
            <p className="text-gray-500 mt-2 text-lg">Resumen general del sistema Attira</p>
          </div>
          <div className="text-sm text-gray-500 bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
            Actualizado: {new Date().toLocaleString('es-ES', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Total Usuarios" 
          value={overview.totalUsers} 
          subtitle="Cuentas registradas" 
          icon="👥"
        />
        <MetricCard 
          label="Prendas en Armarios" 
          value={overview.totalWardrobe} 
          subtitle="Items totales" 
          icon="👕"
        />
        <MetricCard 
          label="Outfits Generados" 
          value={overview.totalOutfits} 
          subtitle="Guardados por usuarios" 
          icon="✨"
        />
        <MetricCard 
          label="Generaciones IA" 
          value={overview.totalGenerations} 
          subtitle={`${overview.acceptanceRate || 0}% aceptados`} 
          icon="🤖"
        />
      </div>

      {/* Métricas Secundarias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Activos Hoy" 
          value={overview.activeToday} 
          subtitle="Sesiones iniciadas hoy" 
          icon="🔥"
        />
        <MetricCard 
          label="Nuevos esta semana" 
          value={overview.newUsersWeek} 
          subtitle="Últimos 7 días" 
          icon="📈"
        />
        <MetricCard 
          label="Outfits Aceptados" 
          value={overview.acceptedGenerations} 
          subtitle="Guardados exitosamente" 
          icon="✅"
        />
        <MetricCard 
          label="Pendientes de Guardar" 
          value={overview.totalGenerations - (overview.acceptedGenerations || 0)} 
          subtitle="Generaciones sin acción" 
          icon="⏳"
          variant="warning"
        />
      </div>

      {/* Gráficos con más espacio */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pt-4">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Crecimiento de Usuarios (30 días)</h3>
          <BarChart data={userTrend} height={360} stack />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Uso de Inteligencia Artificial (30 días)</h3>
          <BarChart data={usageTrend} height={360} stack />
        </div>
      </div>

      {/* Sección Inferior */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Ocasiones más usadas</h3>
          <BarChart 
            data={occasions.slice(0, 8).map(o => ({
              label: o.occasion,
              value: o.count,
              color: '#6366f1',
            }))} 
            height={360}
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Usuarios más activos</h3>
          <div className="space-y-6">
            {topUsers.length > 0 ? (
              topUsers.map((user, idx) => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-200"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-11 h-11 bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{user.name}</p>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-semibold text-gray-900">{user.generations}</p>
                    <p className="text-xs text-gray-500">generaciones</p>
                    {user.wardrobe > 0 && (
                      <p className="text-emerald-600 text-sm mt-1">{user.wardrobe} prendas</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-400">
                Aún no hay usuarios activos
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}