### Movie-App page

## Mobile View
사진
- 영화 앱을 모바일에서 볼 수 있도록 하기 위해 mobile view 버전으로 만들었습니다.

### 라이브러리
- react-device-detect
- MobileView 태그를 이용해서 모바일에서만 렌더링 되는 컴포넌트를 만들 수 있게 도와줍니다.
```
  <React.StrictMode>
    <RecoilRoot>
      <MobileView>
        <div>모바일 뷰가 보여지는 곳입니다.</div>
      </ MobileView>
      <BrowserView>
        <div>브라우저 뷰가 보여지는 곳입니다.</div>
      </BrowserView>
    </RecoilRoot>
  </React.StrictMode>
```

## Search Tab
![image](https://user-images.githubusercontent.com/67466789/168452864-7554efc9-bb87-48b5-a42f-98247334f66e.png)
- 메인 search tab을 누르면 기본적으로 영화 검색 결과가 없다고 뜹니다.
- 검색창에 영화 제목이나 키워드를 입력한 후 Enter나 검색 버튼을 누르면 검색이 됩니다. 
- 전체 검색 결과 수가 상단에 뜨게 됩니다.
- 해당 제목이나 키워드에 부합하는 영화의 poster, title, year, type 이 리스트 형식으로 뜹니다.
- 만약 영화 poster img가 없으면 noImg 이미지로 띄워집니다. 
- 특정 영화를 클릭하면 창이 뜨면서 즐겨찾기 여부를 물어봅니다. 
- 즐겨찾기 시 영화 카드 하단 오른쪽에 하트 아이콘으로 즐겨찾기가 표시 됩니다.
- 이미 즐겨찾기를 한 영화라면 중복 즐겨찾기 되지 않습니다.
- 검색 결과가 남아있다면 하단으로 스크롤 했을 때 로딩이 뜨고, 새 결과 페이지가 보여집니다. 
- 검색 결과가 남아있지 않다면 더 이상 페이지를 보여주지 않습니다. 

## Bookmark Tab
사진
- bookmark tab을 누르면 탭의 배경색이 바뀌며 기본적으로 즐겨찾기한 영화가 없다고 뜹니다.
- 검색창에서 원하는 영화를 즐겨찾기 하면 bookmark tab에 즐겨찾기 영화가 보여지게 됩니다.
- 영화를 누르면 즐겨찾기 해제 여부를 물어보는 창이 뜹니다. 
- 즐겨찾기 해제를 하게 되면 영화가 즐겨찾기 목록에서 삭제 됩니다. 
- 드래그 앤 드롭을 통해 각 영화의 순서를 바꿀 수 있고 이 순서는 유지 됩니다. 
