import { Link } from 'react-router-dom'

function DropDown({blogs, handleSearch}) {
    if(!blogs) {
        return null;
    }
    return (
        <ul>
            {blogs.map(b => (
                <li key={b.id}>
                <Link 
                to={`/blogs/${b.id}`} 
                style={{ textDecoration: 'none', color: 'black' }} 
                onClick={() => handleSearch()}>
                    {b.title}
                </Link>
                </li>
            ))}
        </ul>
    )
}

export default DropDown