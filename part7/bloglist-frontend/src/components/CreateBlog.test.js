import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {
  const blog = {
    title: 'Testing Blog',
    author: 'Test',
    likes: 3,
    url: 'www.google.com',
    user: {
      name: 'Testman',
    },
  }
  test('create a new blog', async () => {
    const mockCreateBlog = jest.fn()

    const { container } = render(
      <CreateBlog handleCreateBlog={mockCreateBlog} />
    )

    const inputTitle = container.querySelector('.title')
    const inputAuthor = container.querySelector('.author')
    const inputUrl = container.querySelector('.url')
    const sendButton = container.querySelector('.create')

    await userEvent.type(inputTitle, blog.title)
    await userEvent.type(inputAuthor, blog.author)
    await userEvent.type(inputUrl, blog.url)
    await userEvent.click(sendButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0]).toBe('Testing Blog')
  })
})
