import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from './store'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchWrapper,
  NavSearch,
  SearchInfo,
	SearchInfoTitle,
	SearchInfoSwitch,
	SearchInfoList,
  Addition,
  Button,
  SearchInfoItem
} from './style'

class Header extends Component {
  // 是否显示热门搜索内容
  getListArea() {
    const { focused, list, page, totalPage, handleMouseEnter, mouseEnter, handleMouseLeave, handleChangePage } = this.props
    const rsList = list.toJS()
    const pageList = []

    if (rsList.length) {
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        pageList.push(
          <SearchInfoItem key={rsList[i]}>{ rsList[i] }</SearchInfoItem>
        )
      }
    }

    if (focused || mouseEnter) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch
              onClick={() => handleChangePage(page, totalPage, this.loadIcon)}>
              <i ref={icon => {this.loadIcon = icon}} className="iconfont icon-load"></i>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {pageList}
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null
    }
  }

  render() {
    const {focused, handleInputFocus, handleInputBlur, list} = this.props
    return (
      <HeaderWrapper>
        <Logo/>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          <NavItem className='right'>登陆</NavItem>
          <NavItem className='right'>
            <i className='iconfont icon-Aa'></i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={focused}
              timeout={200}
              classNames="slide">
              <NavSearch
                className={focused ? 'focused' : ''}
                onFocus={() => handleInputFocus(list)}
                onBlur={handleInputBlur}></NavSearch>
            </CSSTransition>
            <i className={focused ? 'focused icon-sousuo1 iconfont zoom': ' icon-sousuo1 iconfont zoom'}>
            </i>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className='writting'>
            <i className="iconfont icon-biji"></i>
            写文章
          </Button>
          <Button className='reg'>注册</Button>
        </Addition>
      </HeaderWrapper>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    focused: state.getIn(['header', 'focused']),
    mouseEnter: state.getIn(['header', 'mouseEnter']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      !list.size && dispatch(actionCreators.getList())
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },
    handleChangePage(page, totalPage, loadIcon) {
      // 加载动画

      let curAngle = loadIcon.style.transform.replace(/[^0-9]/ig, '')
      curAngle ? curAngle = parseInt(curAngle, 10) : curAngle = 0
      loadIcon.style.transform = `rotate(${curAngle + 360}deg)`

      dispatch(actionCreators.changePage( page < totalPage ? page + 1 : 1))
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Header);