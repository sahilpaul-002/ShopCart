import React, {useState} from 'react'
import SearchCollapseContext from '../contexts/SearchCollapseContext'

export default function SearchCollapseState(props) {
    // State to store the searchbar collapse
    const [searchbarCollapse, setSearchbarCollapse] = useState(true);

    // State to store the search results
    const [search, setSearch] = useState("")

    const value = {searchbarCollapse, setSearchbarCollapse, search, setSearch};

  return (
    <SearchCollapseContext value={value} >{props.children}</SearchCollapseContext>
  )
}
