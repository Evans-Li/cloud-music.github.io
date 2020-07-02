import React from 'react'
import { ListWrapper, List, ListItem} from './style'


function RecommendList(props: any){

  const { recommendList } = props
  const enterDetails = (id:string | number)=>{
    props.history.push(`/recommend/'${id}`)
  }

  return(
    <ListWrapper>
      <h1>推荐歌单</h1>
      <List>
        {
          !!recommendList.length && recommendList.map((item,index) =>{
            return(
              <ListItem key={item.id} onClick={() => enterDetails(item.id)} >

              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}