import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('render content', () => {
  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent('testTEST222')
  
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('author2')

  const element = component.getByText('testTEST222 author2')
  expect(element).toBeDefined()
})

test('after clicking the button, children are displayed', () => {
  const component = render(
    <Blog blog={blog} user={user}/>
  )
  const button = component.getByText('show')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent('https://te333stnodevn.herokuapp.com/api/notes')
  expect(component.container).toHaveTextContent('likes 40')
})

const blog = {
  title: 'testTEST222',
  author: 'author2',
  url: 'https://te333stnodevn.herokuapp.com/api/notes',
  likes: 40,
  user: {
    username: 'teew',
    name: 'test',
    id: '61a597a7da525da2dffcdb3f'
  },
  id: '61a59b5c41e279e91f9ce495'
}

const user = {
  name: 'test'
}