import Link from 'next/link';

export default function ViewCourseTable({courses}) {
    if (courses.length === 0) {
        return <div className='empty-list'>موردی وجود ندارد</div>
    } else {
        return (
            <>
                <table>
                    <thead>
                    <tr>
                        <th>نام دوره</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map((course, index) => {
                        return (
                            <tr key={index}>
                                <td>{course.title}</td>
                                <td>{course.status}</td>
                                <td><Link href={`/admin/course/edit/${course.slug}`}><a>ویرایش</a></Link></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </>
        )
    }
}