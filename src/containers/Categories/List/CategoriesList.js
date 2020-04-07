import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import shuffle from 'lodash/shuffle';
import throttle from 'lodash/throttle';
import FlipMove from 'react-flip-move';
import { SingleCardWrapper, SortableCardWrapper } from './shuffle.style';
import categoriesActions from 'redux/categories/actions';
import Header from './Header';
import categoriesAction from '../../../redux/categories/actions';

const sortAsc = (a, b) => a.display_name > b.display_name;
const sortDesc = (a, b) => b.display_name > a.display_name;

class ListItem extends Component {
  render() {
    const listClass = `isoSingleCard card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      <SingleCardWrapper id={this.props.id} className={listClass} style={style} onClick={this.props.onClick}>
        <Link to={`/dashboard/home/${this.props.category}`}>
          <div className="isoCardImage">
            <img alt="#" src={this.props.pictureUrl} />
          </div>
          <div className="isoCardContent">
            <h3 className="isoCardTitle">{this.props.display_name}</h3>
          </div>
        </Link>
      </SingleCardWrapper>
    );
  }
}

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removedArticles: [],
      view: 'list',
      order: 'asc',
      sortingMethod: 'chronological',
      enterLeaveAnimation: 'accordionVertical',
      articles: [],
    };

    console.log(props);

    this.toggleList = this.toggleList.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.sortRotate = this.sortRotate.bind(this);
    this.sortShuffle = this.sortShuffle.bind(this);
  }

  componentWillMount() {
    this.props.fetchList();
  }

  componentWillReceiveProps({ categories }) {
    this.setState({ articles: categories.sort(sortAsc) });
  }

  toggleList() {
    this.setState({
      view: 'list',
      enterLeaveAnimation: 'accordionVertical',
    });
  }

  toggleGrid() {
    this.setState({
      view: 'grid',
      enterLeaveAnimation: 'accordionHorizontal',
    });
  }

  toggleSort() {
    this.setState({
      order: this.state.order === 'asc' ? 'desc' : 'asc',
      sortingMethod: 'chronological',
      articles: this.state.articles.sort(
        this.state.order === 'asc' ? sortDesc : sortAsc
      ),
    });
  }

  sortShuffle() {
    this.setState({
      sortingMethod: 'shuffle',
      articles: shuffle(this.state.articles),
    });
  }

  moveArticle(source, dest, id) {
    const sourceArticles = this.state[source].slice();
    let destArticles = this.state[dest].slice();

    if (!sourceArticles.length) return;

    // Find the index of the article clicked.
    // If no ID is provided, the index is 0
    const i = id ? sourceArticles.findIndex(article => article.id === id) : 0;

    // If the article is already removed, do nothing.
    if (i === -1) return;

    destArticles = [].concat(sourceArticles.splice(i, 1), destArticles);

    this.setState({
      [source]: sourceArticles,
      [dest]: destArticles,
    });
  }

  sortRotate() {
    const articles = this.state.articles.slice();
    articles.unshift(articles.pop());

    this.setState({
      sortingMethod: 'rotate',
      articles,
    });
  }

  renderArticles() {
    return this.state.articles.map((article, i) => {
      return (
        <ListItem
          key={article.id}
          view={this.state.view}
          index={i}
          onClick={() => this.props.selectCategory(article.id)}
          {...article}
        />
      );
    });
  }

  renderContent() {
    const { loading } = this.props;
    const hasArticles = this.state.articles.length > 0;

    if (loading) return <h2>Loading...</h2>;

    return hasArticles
      ? this.renderArticles()
      : <h2>No category added</h2>;
  }

  render() {
    const { loading } = this.props;
    const { articles, view, order, sortingMethod } = this.state;
    const hasArticles = !loading && articles.length > 0;

    return (
      <SortableCardWrapper
        id="shuffle"
        className={`isomorphicSortableCardsHolder ${view}`}
      >
        {hasArticles && (
          <Header
            view={view}
            order={order}
            sortingMethod={sortingMethod}
            toggleList={this.toggleList}
            toggleGrid={this.toggleGrid}
            toggleSort={this.toggleSort}
            sortShuffle={this.sortShuffle}
            sortRotate={this.sortRotate}
          />
        )}

        <div className="isoSortableCardsContainer">
          <FlipMove
            staggerDurationBy="30"
            duration={500}
            enterAnimation={this.state.enterLeaveAnimation}
            leaveAnimation={this.state.enterLeaveAnimation}
            typeName="ul"
          >
            {this.renderContent()}
          </FlipMove>
        </div>
      </SortableCardWrapper>
    );
  }
}

export default connect(
  state => ({
    loading: state.Categories.get('loading'),
    categories: state.Categories.get('list').toArray()
  }),
  {
    fetchList: categoriesActions.fetchList,
    selectCategory: categoriesAction.selectCategory,
  }
)(CategoriesList);
