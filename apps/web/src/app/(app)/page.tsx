import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'

import { Course, getCourses } from '@/http/get-courses'
import { Enrollment, getEnrollments } from '@/http/get-enrollments'
import { getProfile } from '@/http/get-profile'

dayjs.locale('pt-br')

export default async function Home() {
  const { user } = await getProfile()
  const { courses } = await getCourses()
  const { enrollments } = await getEnrollments(user.id)

  return (
    <div className="py-4">
      <main className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Perfil</h2>

          <div className="rounded-lg border p-4">
            <div className="space-y-2">
              <p>
                <strong>Nome:</strong> {user.name}
              </p>
              <p>
                <strong>E-mail:</strong> {user.email}
              </p>
              <p>
                <strong>Criado em:</strong>{' '}
                {dayjs(user.createdAt).format('DD/MM/YYYY HH:mm:ss')}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Cursos</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course: Course) => {
              const enrollment = enrollments.find(
                (enrollment: Enrollment) => enrollment.courseId === course.id,
              )

              return (
                <div key={course.id} className="rounded-lg border p-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{course.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {course.description}
                    </p>
                    <p className="text-sm">
                      <strong>Carga horária:</strong> {course.hours}h
                    </p>

                    {enrollment && (
                      <p className="text-muted-foreground text-sm">
                        <strong>Matriculado em:</strong>{' '}
                        {dayjs(enrollment.enrolledAt).format(
                          'DD/MM/YYYY HH:mm:ss',
                        )}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
