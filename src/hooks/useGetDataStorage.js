const useGetDataStorage = (query) => {
  let dataStorage = null

  const data = window.localStorage.getItem(query)
  if(data !== null) {
    dataStorage = JSON.parse(data)
  }

  return dataStorage
}

export default useGetDataStorage