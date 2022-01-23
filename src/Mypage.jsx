import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  width: 780px;
  .bold{
    font-weight: bold;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const PageTitle = styled.div`
  font-weight: bold;
  font-size: 1.75rem;
`

const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 4.5rem;
  font-size: 0.875rem;
`

const ContentWrapper = styled.div`
  margin-top: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 95%;
    padding: 1rem;
  }
`

const ContentBox = styled.div`
  width: 680px;
  height: 470px;
  box-shadow: 0 4px 15px rgba(194,194,194,0.4);
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const ContentTitle = styled.div`
  width: 100%;
  height: 40px;
  background: #92A8D1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  border-radius: 10px 10px 0 0;
  span{
    margin: 0 1rem;
  }
  .content-name{
    font-size: 1.125rem;
  }
`

const DetailArea = styled.div`
  .detail-time{
    margin: 40px 0 0 40px;
    span{
      margin-right: 2rem;
    }
  }

  .detail-formarea{
    width: 540px;
    margin: 36px auto 24px;
    @media (max-width: 768px) {
    width: 100%;
    }
  }

  .detail-comment{
    margin: 20px auto 21px 40px;
    font-size: 14px;
  }

  .detail-image{
    margin-top: 20px;
    display:flex;
    justify-content:start;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const InputTextarea = styled.textarea`
  width: 506px;
  height: 96px;
  border-radius: 5px;
  background: #FDFDFD;
  padding: 1rem;
  font-size: 14px;
  color: #666666;
  border: 1px solid #BBBBBB;
  resize: none;
  @media (max-width: 768px) {
    width:100%;
  }
`;

const InputImage = styled.label`
  width: 100px;
  height: 100px;
  border: 2px dashed #BBBBBB;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 20px;
  input{
    display: none;
  }
  img{
    width: 100%;
    height: 100%;
  }
`;

const MoreButton = styled.div`
  width: 300px;
  height: 40px;
  display: flex;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  background: #FDFDFD;
  box-shadow: 0 4px 15px rgba(194,194,194,0.4);
  border-radius: 10px;
`;

const ButtonArea = styled.div`
  margin: 0px 19px 35px auto;
  float: right;
  color: #FFFFFF;
  font-size: 14px;
  vertical-align: middle;
  .button{
    width: 100px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    float: right;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .red-button{
    background-color: #F9A7A7;
    margin-right: 20px;
  }
  .blue-button{
    background-color: #8BAEEF;
  }
  @media (max-width: 768px) {
    margin: 0 0 auto auto;
  }
`;

function Mypage() {

  const textRef = useRef();
  // imageList - 출력용 state
  const [imageList, setImageList] = useState([]);
  // Bg - 이미지 미리보기 위한 state
  const [inputs, setInputs] = useState({
    file1: null,
    file2: null,
    file3: null,
    file1Bg: null,
    file2Bg: null,
    file3Bg: null,
  });

  const { file1, file2, file3, file1Bg, file2Bg, file3Bg } = inputs;

  //파일 업로드시 
  const onLoadFile = (e) => {
    let reader = new FileReader();
    let name = e.target.name;
    let bgname = name + 'Bg';
    let file = e.target.files[0];
    
    // 이미지 미리보기 위해 파일 읽고, state 업데이트
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setInputs({
        ...inputs,
        [name]: file,
        [bgname]: reader.result,
      })
      setImageList([...imageList, "'" + file.name + "'"]);
    }
  }

  const onSubmitHandler = () => {
    const textval = textRef.current.value;
    const imageNum = imageList.length;
    if(textval.length < 30 || textval.length > 500) return alert('30~500자 등록가능');

    console.log('후기데이터 - 내용: "' + textval + '" 파일 개수 : '+ imageNum + ' 파일 원본 이름: [' + imageList + ']');
  }

  return (
    <div className="App">
      <Wrapper>
        <PageTitle>
          <span>마이페이지</span>
        </PageTitle>
        <Navbar>
          <div>신청 내역</div>
          <div>찜한 모임</div>
          <div>포인트</div>
          <div>내 정보</div>
          <div className='bold'>후기 관리</div>
          <div>문의 내역</div>
        </Navbar>
        <ContentWrapper>
          <ContentBox>
            <ContentTitle>
              <span className='content-name'>싱글 직장인 와인 파티</span>
              <span>20대 후반~30대 초반</span>
            </ContentTitle>
            <DetailArea>
              <div className='detail-time'>
                <span className='bold'>모임 일자</span>
                <span className='bold'>2월 10일 토요일 오후 5시</span>
              </div>
              <div className='detail-formarea'>
                <div className='detail-textarea'>
                  <InputTextarea ref={textRef} placeholder='내용을 입력하세요.&#13;&#10;30자~500자 등록 가능' minLength={30} maxLength={500} required />
                </div>
                <div className='detail-image'>
                  <InputImage htmlFor='input-file1'>
                    {file1 && file1Bg? (
                      <img src={file1Bg} alt="file1" />
                    ) : (
                      <>
                        <div style={{fontSize:'24px'}}>+</div>
                        <div>사진 첨부</div>
                      </>
                    )}
                    <input type='file' id='input-file1' name='file1' accept='image/*' onChange={onLoadFile} />
                  </InputImage>
                  <InputImage htmlFor='input-file2'>
                    {file2 && file2Bg? (
                      <img src={file2Bg} alt="file2" />
                    ) : (
                      <>
                        <div style={{fontSize:'24px'}}>+</div>
                        <div>사진 첨부</div>
                      </>
                    )}
                    <input type='file' id='input-file2' name='file2' accept='image/*' onChange={onLoadFile} />
                  </InputImage>
                  <InputImage htmlFor='input-file3'>
                    {file3 && file3Bg? (
                      <img src={file3Bg} alt="file3" />
                    ) : (
                      <>
                        <div style={{fontSize:'24px'}}>+</div>
                        <div>사진 첨부</div>
                      </>
                    )}
                    <input type='file' id='input-file3' name='file3' accept='image/*' onChange={onLoadFile} />
                  </InputImage>
                </div>
              </div>
              <ButtonArea>
                <div className='button blue-button' onClick={onSubmitHandler}>
                  등록하기
                </div>
                <div className='button red-button'>
                  취소
                </div>
              </ButtonArea>
            </DetailArea>
          </ContentBox>
          <ContentBox style={{marginTop:'35px', height:'220px'}}>
            <ContentTitle>
              <span className='content-name'>싱글 직장인 와인 파티</span>
              <span>20대 후반~30대 초반</span>
            </ContentTitle>
            <DetailArea>
              <div className='detail-time'>
                <span className='bold'>모임 일자</span>
                <span className='bold'>2월 10일 토요일 오후 5시</span>
              </div>
              <div className='detail-comment'>
                <span>후기를 작성해주세요.<br/>소정의 포인트가 지급됩니다.</span>
              </div>
              <ButtonArea>
                <div className='button blue-button'>
                  후기 수정
                </div>
                <div className='button red-button'>
                  후기 보기
                </div>
              </ButtonArea>
            </DetailArea>
          </ContentBox>
          <MoreButton>
          더 보기
          </MoreButton>
        </ContentWrapper>
      </Wrapper>
    </div>
  );
}

export default Mypage;