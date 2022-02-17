export const useGetPosts = async (props: any) => {
  const { readyToGet, amount, page, callback } = props

  if (readyToGet) {
    const rawResponse = await fetch(`https://frontend-case-api.sbdev.nl/api/posts?page=${page}&perPage=${amount}`, {
      method: 'GET',
      headers: {
        'token': process.env.TOKEN || ''
      }
    })

    const response = await rawResponse.json()
    console.log('GOT ONE RESPONSE')
    console.log(response)
    callback(response)
  }
}

export const useGetCategories = async (props: any) => {
  const { readyToGet, callback } = props

  if (readyToGet) {
    const rawResponse = await fetch(`https://frontend-case-api.sbdev.nl/api/categories`, {
      method: 'GET',
      headers: {
        'token': process.env.TOKEN || ''
      }
    })

    const response = await rawResponse.json()
    console.log('GOT ONE RESPONSE')
    console.log(response)
    callback(response)
  }
}

// export const useCreatePost = async (props: any) => {
//   const { readyToGo, post, callback, handled } = props

//   setTimeout(()=> {}, 200)
//   if (readyToGo) {
//     console.log('Ready for take off')
//     if (post) {
//       callback()
//       console.log('Posting')
//       var formdata = new FormData();
//       formdata.append("title", post.title);
//       formdata.append("content", post.content);
//       formdata.append("category_id", post.category_id);
//       formdata.append("image", post.image, post.image_name);

//       const rawResponse = await fetch(`https://frontend-case-api.sbdev.nl/api/posts`, {
//         method: 'POST',
//         headers: {
//           'token': process.env.TOKEN || ''
//         },
//         body: formdata
//       })

//       const response = await rawResponse.json()
//       console.log(response)
//       callback(response)
//     }
//   }
// }

export const uploadPost = async (props: any) => {
  const { readyToGo, post, callback } = props

  // if (readyToGo) {
  if (post) {
    console.log('Posting')
    var formdata = new FormData();
    formdata.append("title", post.title);
    formdata.append("content", post.content);
    formdata.append("category_id", post.category_id);
    formdata.append("image", post.image, post.image_name);

    const rawResponse = await fetch(`https://frontend-case-api.sbdev.nl/api/posts`, {
      method: 'POST',
      headers: {
        'token': process.env.TOKEN || ''
      },
      body: formdata
    })

    const response = await rawResponse.json()
    console.log(response)
    //     callback(response)
    //   }
    // }
  }
}