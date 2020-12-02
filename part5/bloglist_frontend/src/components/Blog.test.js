import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Component testing is done with react-testing-library'
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
})
