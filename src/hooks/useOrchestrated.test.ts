import { Book } from '../types/books'
import { renderHook } from '@testing-library/react'
import { ActionTypes, PutAllValuesInStore, UpdateValueInStore } from '../actions/BaseActions'
import { StoreState } from '../createStore'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useOrchestrated } = require('../hooks/useOrchestrated')

describe('the useOrchestrated hook', () => {
  it('Calls the API only once', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 })
      })
    ) as jest.Mock

    const { result } = renderHook(() => useOrchestrated<Book>({ pathName: 'books' }))

    for (let i = 0; i < 1000; i++) {
      await result.current?.getAll()
    }

    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('Can perform multiple dispatches', async () => {
    const dummyBookResponse = [
      {
        _id: '63438078638b950de4b9b797',
        title: 'Text 2',
        isbn: '1111',
        author: 'Viral',
        description: 'Test',
        updated_date: '2022-10-10T02:16:24.017Z'
      },
      {
        _id: '63438319719ee60620ca0813',
        title: 'Text 2',
        isbn: '1111',
        author: 'Viral',
        description: 'Test',
        updated_date: '2022-10-10T02:27:37.665Z'
      },
      {
        _id: '635a98df757bf857df5708a6',
        title: 'Text 4',
        isbn: '1131',
        author: 'Parth',
        description: 'Test',
        updated_date: '2022-10-27T14:42:39.471Z'
      },
      {
        _id: '635aa0e7bb731abde7289fd0',
        title: 'Text 5',
        isbn: '234',
        author: 'Dhwanil',
        description: 'Dhwanils Book',
        updated_date: '2022-10-27T15:16:55.421Z'
      },
      {
        _id: '635aa18fbb731abde7289fd4',
        title: 'Text 6',
        isbn: '978',
        author: 'Viral',
        description: 'Virals Book',
        updated_date: '2022-10-27T15:19:43.095Z'
      },
      {
        _id: '635aa217bb731abde7289fd8',
        title: 'Text 6',
        isbn: '234324',
        author: 'Viral',
        description: 'ViralsBook',
        updated_date: '2022-10-27T15:21:59.236Z'
      },
      {
        _id: '635aa25e1c02938ab912b766',
        title: 'Text 6',
        isbn: '324',
        author: 'Viral',
        description: 'Viral',
        updated_date: '2022-10-27T15:23:10.012Z'
      },
      {
        _id: '635aa2901c02938ab912b768',
        title: 'Text 6',
        isbn: '324',
        author: 'Viral',
        description: 'Viral',
        updated_date: '2022-10-27T15:24:00.007Z'
      },
      {
        _id: '635aa2f31c02938ab912b76a',
        title: 'Text 6',
        isbn: '324',
        author: 'Viral',
        description: 'Viral',
        updated_date: '2022-10-27T15:25:39.210Z'
      },
      {
        _id: '635aa2f31c02938ab912b76c',
        title: 'Text 6',
        isbn: '324',
        author: 'Viral',
        description: 'Viral',
        updated_date: '2022-10-27T15:25:39.264Z'
      },
      {
        _id: '635aa4171c02938ab912b770',
        title: 'Text 6',
        isbn: '23234',
        author: 'Viral',
        description: 'Viral',
        updated_date: '2022-10-27T15:30:31.682Z'
      },
      {
        _id: '635aa47dd0b85a31bb62e470',
        title: 'Text 6',
        isbn: '243324',
        author: 'Text 6',
        description: 'Text 6',
        updated_date: '2022-10-27T15:32:13.717Z'
      },
      {
        _id: '635aa536d0b85a31bb62e477',
        title: 'fsddfs',
        isbn: '234342',
        author: 'dfsfdsdfs',
        description: 'fdsdsffds',
        updated_date: '2022-10-27T15:35:18.065Z'
      },
      {
        _id: '635ac759cb57520d7a249436',
        title: 'Patel',
        isbn: '2342',
        author: 'Patel',
        description: 'Parth Patel',
        updated_date: '2022-10-27T18:00:57.514Z'
      },
      {
        _id: '635acc002c43cfc38ad22534',
        title: 'new test',
        isbn: '12344555',
        author: 'parth',
        description: 'patel',
        updated_date: '2022-10-27T18:20:48.308Z'
      },
      {
        _id: '635af880064833a96565fed8',
        title: 'Checking rerender',
        isbn: '323223',
        author: 'Author',
        description: 'description',
        updated_date: '2022-10-27T21:30:40.060Z'
      },
      {
        _id: '635b000e631acb619a689337',
        title: 'Aibin',
        isbn: '8778',
        author: 'Prof',
        description: 'prof',
        updated_date: '2022-10-27T22:02:54.324Z'
      },
      {
        _id: '635c11bc066321a10dc36164',
        title: 'PouyansBook',
        isbn: '345543',
        author: 'Pouyan',
        description: 'Pouyan',
        updated_date: '2022-10-28T17:30:36.085Z'
      },
      {
        _id: '63630a7c9c77e74303a3de79',
        title: 'newBook',
        isbn: '123321',
        author: 'Barney',
        description: 'amazing book',
        updated_date: '2022-11-03T00:25:32.429Z'
      },
      {
        _id: '63630a869c77e74303a3de7b',
        title: 'newBook',
        isbn: '123321',
        author: 'Barney',
        description: 'amazing book',
        updated_date: '2022-11-03T00:25:42.837Z'
      },
      {
        _id: '63630b0d9c77e74303a3de7f',
        title: 'new book ',
        isbn: '1233212',
        author: 'Barney',
        description: 'amazing book',
        updated_date: '2022-11-03T00:27:57.681Z'
      },
      {
        _id: '63630c5f9c77e74303a3de83',
        title: 'test book',
        isbn: '1233321',
        author: 'barney',
        description: 'new book',
        updated_date: '2022-11-03T00:33:35.145Z'
      },
      {
        _id: '63630cbf9c77e74303a3de87',
        title: 'test book 2',
        isbn: '1233321',
        author: 'ted',
        description: 'cool book',
        updated_date: '2022-11-03T00:35:11.165Z'
      },
      {
        _id: '63630d7c9c77e74303a3de8b',
        title: 'new book test',
        isbn: '122321',
        author: 'barney',
        description: 'awesome book',
        updated_date: '2022-11-03T00:38:20.173Z'
      },
      {
        _id: '63630e069c77e74303a3de8f',
        title: 'new book test ',
        isbn: '123321',
        author: 'barney',
        description: 'awesome book',
        updated_date: '2022-11-03T00:40:38.376Z'
      },
      {
        _id: '63630fa4b3d6173a924ba597',
        title: 'TEST Book',
        isbn: '1234456',
        author: 'test test',
        description: 'awesome book',
        updated_date: '2022-11-03T00:47:32.262Z'
      },
      {
        _id: '63631063b3d6173a924ba59b',
        title: 'Wings of fire',
        isbn: '12333212123',
        author: 'Abdul Kalam',
        description: 'awesome book',
        updated_date: '2022-11-03T00:50:43.997Z'
      },
      {
        _id: '63631104b3d6173a924ba59d',
        title: 'radical candor',
        isbn: '12333212123123',
        author: 'Robert',
        description: 'awesome book',
        updated_date: '2022-11-03T00:53:24.890Z'
      },
      {
        _id: '636ab773f8222d43fd1cd102',
        title: 'Web Dev',
        isbn: '234324asd',
        author: 'sfajhsdih',
        description: 'fsdjhdfs',
        updated_date: '2022-11-08T20:09:23.958Z'
      }
    ] as StoreState<Book[]>

    const updatedValue = {
      _id: '636ab773f8222d43fd1cd102',
      title: 'Web Dev 1',
      isbn: '234324asd',
      author: 'Web Dev 1',
      description: 'Web Dev 1',
      updated_date: '2022-11-08T20:09:23.958Z'
    }

    const { result } = renderHook(() => useOrchestrated<Book>({ pathName: 'books' }))

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const store = result.current?.getStore()

    if (store) {
      PutAllValuesInStore({
        payload: dummyBookResponse,
        store: store,
        state: store.getState(),
        type: ActionTypes.GET_ALL
      })

      for (let i = 0; i < 10000; i++) {
        UpdateValueInStore({
          payload: updatedValue,
          store: store,
          state: store.getState(),
          type: ActionTypes.UPDATE
        })
      }
    }
  })
})
