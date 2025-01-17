import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'

import { getEnrollments } from '@/http/get-enrollments'
import { getUsers } from '@/http/get-users'

dayjs.locale('pt-br')

export default async function Home() {
  const { users } = await getUsers()

  const usersWithEnrollments = await Promise.all(
    users.map(async (user) => {
      const { enrollments } = await getEnrollments(user.id)
      return { ...user, enrollments }
    }),
  )

  return (
    <div className="py-4">
      <main className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Usuários</h1>
          <p className="text-sm text-muted-foreground">
            Lista de usuários cadastrados no sistema
          </p>
        </div>

        <div className="space-y-6">
          {usersWithEnrollments.map((user) => (
            <div key={user.id} className="rounded-lg border p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p>
                    <strong>Usuário:</strong> {user.name}
                  </p>
                  <p>
                    <strong>E-mail:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Criado em:</strong>{' '}
                    {dayjs(user.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                  </p>
                </div>

                <div className="space-y-2">
                  <strong>Cursos:</strong>

                  {user.enrollments.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Nenhum curso matriculado
                    </p>
                  ) : (
                    <ul className="list-inside list-disc space-y-1">
                      {user.enrollments.map((enrollment) => (
                        <li key={enrollment.id} className="text-sm">
                          {enrollment.course.title} (Matriculado em:{' '}
                          {dayjs(enrollment.enrolledAt).format(
                            'DD/MM/YYYY HH:mm:ss',
                          )}
                          )
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
