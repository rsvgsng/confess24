import React from 'react'

function Relatedcard(p) {

  var {cat,content} =p
  return (
    <div className='related-card'>
        <div className="cat-rel">
            <p>{cat}</p>
        </div>
        <div className="content-rel">
            <p>
      {content.length>=100?content.slice(0,70)+'....':content}
            </p>
        </div>
    </div>
  )
}

export default Relatedcard