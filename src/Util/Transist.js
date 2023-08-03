import styled from 'styled-components';

export const TransistStyle = styled.div `
.transition-wrapper {
    position: relative;
    z-index: 1;
    .transition-item {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
  }
  
  .detail-page {
    padding: 10px 10px;
    background-color: #fff;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;
  
    a {
      color: white;
    }
  
    &.transition-appear {
      transition: transform 1s cubic-bezier(0.7, 0, 0.25, 1),
        left 1s cubic-bezier(0.7, 0, 0.25, 1),
        right 1s cubic-bezier(0.7, 0, 0.25, 1),
        height 1s cubic-bezier(0.7, 0, 0.25, 1);
    }
  
    &.transition-appear.transition-appear-active {
    }
  }
 `
