import React,{ forwardRef, useState, useEffect, useRef, useImperativeHandle} from 'react'
import { ScrollContainer, PullUpLoading, PullDownLoading} from './style'
import BScroll from 'better-scroll';
import debounce from 'debounce';
import Loading from '../Loading'
import Loading2 from '../Loading/v2'



interface ScrollProps {
  direction?: 'vertical' | 'horizontal';
  refresh?: boolean;
  onScroll?: Function;
  pullUp?: Function;
  pullDown?: Function;
  pullUpLoading?: boolean;
  pullDownLoading?: boolean;
  bounceTop?: boolean; //是否支持向上吸顶
  bounceBottom?: boolean; //是否支持向上吸顶
  click?: boolean;
  children?: React.ReactNode;
}



const Scroll = forwardRef<any, ScrollProps>((props, ref) => {
  const [bScroll, setBScroll] = useState<any>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    direction = 'vertical',
    click = true,
    refresh = true,
    pullUpLoading = false,
    pullDownLoading = false,
    bounceTop = true,
    bounceBottom = true,
  } = props;

  const { pullUp = () => { }, pullDown = () => { }, onScroll = null } = props;

  useEffect(() => {
    if (bScroll) return;
    const scroll = new BScroll(scrollContainerRef.current!, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);
    if (pullUp) {
      scroll.on('scrollEnd', () => {
        //判断是否滑动到了底部
        if (scroll.y <= scroll.maxScrollY + 100) {
          pullUp();
        }
      });
    }
    if (pullDown) {
      scroll.on('touchEnd', (pos: any) => {
        //判断用户的下拉动作
        if (pos.y > 50) {
          debounce(pullDown, 0)();
        }
      });
    }

    if (onScroll) {
      scroll.on('scroll', (scroll: number) => {
        onScroll(scroll);
      });
    }

    if (refresh) {
      scroll.refresh();
    }
    return () => {
      scroll.off('scroll');
      setBScroll(null);
    };
    // eslint-disable-next-line
  }, []);

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
    scrollTo(x: number, y: number) {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(x, y);
      }
    },
    getBScroll() {
      return bScroll;
    },
  }));

  const PullUpdisplayStyle = pullUpLoading
    ? { display: '' }
    : { display: 'none' };
  const PullDowndisplayStyle = pullDownLoading
    ? { display: '' }
    : { display: 'none' };
  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}>
        <Loading></Loading>
      </PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDowndisplayStyle}>
        <Loading2></Loading2>
      </PullDownLoading>
    </ScrollContainer>
  );
});

export default React.memo(Scroll);
