import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';
import Loading from '../Loading'
import { debounce } from "../../api/utils";

// import { forceCheck } from 'react-lazyload'

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState();

  const scrollContaninerRef = useRef();

  const { direction, click, refresh, bounceTop, bounceBottom } = props;

  const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading } = props;
  const pullUpDisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' }
  const pullDownDisplayStyle = pullDownLoading ? { display: '' } : { display: 'none' }

  let pullUpDebounce = useMemo (() => {
    return debounce (pullUp, 1000)
  }, [pullUp]);
  // 千万注意，这里不能省略依赖，
  // 不然拿到的始终是第一次 pullUp 函数的引用，相应的闭包作用域变量都是第一次的，产生闭包陷阱。下同。
  
  let pullDownDebounce = useMemo (() => {
    return debounce (pullDown, 1000)
  }, [pullDown]);
  //...
  // 之后直接调用 useMemo 返回的函数
  // 滑动到底部

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll]);

  // useEffect(() => {
  //   if (!bScroll || !pullUp) return;
  //   bScroll.on('scrollEnd', () => {
  //     // 判断是否滑动到了底部
  //     if (bScroll.y <= bScroll.maxScrollY + 150) {
  //       pullUp();
  //     }
  //   });
  //   return () => {
  //     bScroll.off('scrollEnd');
  //   }
  // }, [pullUp, bScroll]);


   // useEffect(() => {
  //   if (!bScroll || !pullDown) return;
  //   bScroll.on('touchEnd', (pos) => {
  //     // 判断用户的下拉动作
  //     if (pos.y > 50) {
  //       pullDown();
  //     }
  //   });
  //   return () => {
  //     bScroll.off('touchEnd');
  //   }
  // }, [pullDown, bScroll]);


  useEffect(() => {
    if(!bScroll || !pullUp) return;
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if(bScroll.y <= bScroll.maxScrollY + 100){
        pullUpDebounce();
      }
    };
    bScroll.on('scrollEnd', handlePullUp);
    // 解绑
    return () => {
      bScroll.off('scrollEnd', handlePullUp);
    }
}, [pullUp, pullUpDebounce, bScroll]);


// 判断用户的下拉动作
useEffect(() => {
  if(!bScroll || !pullDown) return;
  const handlePullDown = (pos) => {
    //判断用户的下拉动作
    if(pos.y > 50) {
      pullDownDebounce();
    }
  };
  bScroll.on('touchEnd', handlePullDown);
  return () => {
    bScroll.off('touchEnd', handlePullDown);
  }
}, [pullDown, pullDownDebounce, bScroll]);

 
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));


  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      { pullUpLoading ? <Loading /> : null}
      {/* 顶部下拉刷新动画 */}
      { pullDownLoading ? <Loading /> : null}

    </ScrollContainer>
  );
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
};

export default Scroll;