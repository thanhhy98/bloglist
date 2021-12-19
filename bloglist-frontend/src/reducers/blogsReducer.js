import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_BLOGS': {
            return action.blogs
        }
        case 'ADD_BLOGS': {
            return [...state, action.blog]
        }
        case 'LIKE_BLOG': {
            const newState = state.map(item => {
                if(item.id === action.id) {
                    return {
                        ...action.data,
                        user: {
                            ...action.user
                        }
                    }
                }
                return item
            })
            return newState
        }
        case 'REMOVE_BLOG': {
            const newState = state.filter(item => item.id !== action.id ? true : false)
            return newState
        }
        case 'ADD_COMMENT': {
            const newBlogs = state.map(item => {
                if(item.id === action.id) {
                    return {
                        ...item,
                        comments: [...item.comments, action.comment]
                    }
                }
                return item
            })
            return newBlogs
        }
        default: 
            return state
    }
}

export const addComment = (comment, id) => {
    return async dispatch => {
        const obj = {
            comment
        }
        const returnedComment = await blogService.comment(obj, id)
        dispatch({
            type: 'ADD_COMMENT',
            comment: {
                id: returnedComment.id,
                comment: returnedComment.comment,
                image: returnedComment.image,
                user: returnedComment.user,
                username: returnedComment.username
            },
            id
        })
    }
}
export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch({
            type: 'INIT_BLOGS',
            blogs
        })
    }
}

export const addBlog = (blog, user) => {
    return async dispatch => {
        const data = await blogService.create(blog);
        const newBlog = {
            ...data,
            user: {
              name: user.name
            }
          }
        dispatch({
            type: 'ADD_BLOGS',
            blog: newBlog
        })
    }
}

export const addLike = (blog) => {
    return async dispatch => {
        const id = blog.id
        const data = await blogService.update(blog, id);
        dispatch({
            type: 'LIKE_BLOG',
            user: blog.user,
            data,
            id
        })
    }
}

export const removeFromBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            id
        })
    }
}

export default blogsReducer