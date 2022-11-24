
import { render } from '@testing-library/react';
import React from 'react';
import { BookContext } from '../store/BookContext';
import BookComponentContainer from '../components/BookComponentContainer';
import { dummyBookResponse } from '../../hooks/testUtil';
import renderer from 'react-test-renderer';


function TestComponent() {
  return (
    <>
        <BookContext.Provider value={dummyBookResponse}>
            <BookComponentContainer />
        </BookContext.Provider>
    </>
  )
}

describe('Test', () => {

  it('renders the component correctly.', () => {
    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('count').textContent).toBe('2');

    const tree = renderer
      .create(<TestComponent />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the component correctly.', () => {
    const tree = renderer
      .create(<TestComponent />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
