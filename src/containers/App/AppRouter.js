import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from 'helpers/AsyncFunc';
import getDevRouters from 'customApp/router';

class AppRouter extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <Switch>
        <Route
          path={`${url}/home`}
          component={asyncComponent(() => import('../Categories/index.js'))}
        />
        <Route
          path={`${url}/admin`}
          component={asyncComponent(() => import('../Admin/index.js'))}
        />
        <Route
          exact
          path={`${url}/`}
          component={asyncComponent(() => import('../Widgets/index.js'))}
        />
        <Route
          exact
          path={`${url}/inbox`}
          component={asyncComponent(() => import('../Mail'))}
        />
        <Route
          exact
          path={`${url}/mailbox`}
          component={asyncComponent(() => import('../Mail'))}
        />
        <Route
          exact
          path={`${url}/calendar`}
          component={asyncComponent(() => import('../Calendar/Calendar'))}
        />
        <Route
          exact
          path={`${url}/googlemap`}
          component={asyncComponent(() => import('../Map/GoogleMap/googleMap'))}
        />
        <Route
          exact
          path={`${url}/leafletmap`}
          component={asyncComponent(() => import('../Map/Leaflet/leaflet'))}
        />
        <Route
          exact
          path={`${url}/table_fb`}
          component={asyncComponent(() => import('../Tables/fbTables/'))}
        />
        <Route
          exact
          path={`${url}/table_ant`}
          component={asyncComponent(() => import('../Tables/antTables'))}
        />
        <Route
          exact
          path={`${url}/allFormComponent`}
          component={asyncComponent(() => import('../Forms/allComponents/'))}
        />
        <Route
          exact
          path={`${url}/InputField`}
          component={asyncComponent(() => import('../Forms/Input'))}
        />
        <Route
          exact
          path={`${url}/editor`}
          component={asyncComponent(() => import('../Forms/editor/'))}
        />
        <Route
          exact
          path={`${url}/stepperForms`}
          component={asyncComponent(() => import('../Forms/StepperForms/'))}
        />
        <Route
          exact
          path={`${url}/FormsWithValidation`}
          component={asyncComponent(() =>
            import('../Forms/FormsWithValidation')
          )}
        />
        <Route
          exact
          path={`${url}/progress`}
          component={asyncComponent(() => import('../Forms/Progress'))}
        />
        <Route
          exact
          path={`${url}/ladda_button`}
          component={asyncComponent(() => import('../Forms/LaddaButton'))}
        />
        <Route
          exact
          path={`${url}/button`}
          component={asyncComponent(() => import('../Forms/Button'))}
        />
        <Route
          exact
          path={`${url}/tab`}
          component={asyncComponent(() => import('../Forms/Tab'))}
        />
        <Route
          exact
          path={`${url}/autocomplete`}
          component={asyncComponent(() => import('../Forms/AutoComplete'))}
        />
        <Route
          exact
          path={`${url}/checkbox`}
          component={asyncComponent(() => import('../Forms/Checkbox'))}
        />
        <Route
          exact
          path={`${url}/radiobox`}
          component={asyncComponent(() => import('../Forms/Radiobox/'))}
        />
        <Route
          exact
          path={`${url}/selectbox`}
          component={asyncComponent(() => import('../Forms/Select/'))}
        />
        <Route
          exact
          path={`${url}/transfer`}
          component={asyncComponent(() => import('../Forms/Transfer/'))}
        />
        <Route
          exact
          path={`${url}/gridLayout`}
          component={asyncComponent(() => import('../Box/GridLayout'))}
        />
        <Route
          exact
          path={`${url}/notes`}
          component={asyncComponent(() => import('../Notes'))}
        />
        <Route
          exact
          path={`${url}/todo`}
          component={asyncComponent(() => import('../Todo'))}
        />
        <Route
          exact
          path={`${url}/contacts`}
          component={asyncComponent(() => import('../Contacts'))}
        />
        <Route
          exact
          path={`${url}/alert`}
          component={asyncComponent(() => import('../Feedback/Alert'))}
        />
        <Route
          exact
          path={`${url}/modal`}
          component={asyncComponent(() => import('../Feedback/Modal/'))}
        />
        <Route
          exact
          path={`${url}/message`}
          component={asyncComponent(() => import('../Feedback/Message'))}
        />
        <Route
          exact
          path={`${url}/notification`}
          component={asyncComponent(() => import('../Feedback/Notification'))}
        />
        <Route
          exact
          path={`${url}/progress`}
          component={asyncComponent(() => import('../Feedback/Progress'))}
        />
        <Route
          exact
          path={`${url}/Popconfirm`}
          component={asyncComponent(() => import('../Feedback/Popconfirm'))}
        />
        <Route
          exact
          path={`${url}/spin`}
          component={asyncComponent(() => import('../Feedback/Spin'))}
        />
        <Route
          exact
          path={`${url}/affix`}
          component={asyncComponent(() => import('../Navigation/affix'))}
        />
        <Route
          exact
          path={`${url}/breadcrumb`}
          component={asyncComponent(() =>
            import('../Uielements/Breadcrumb/breadcrumb')
          )}
        />
        <Route
          exact
          path={`${url}/backToTop`}
          component={asyncComponent(() => import('../Navigation/backToTop'))}
        />
        <Route
          exact
          path={`${url}/dropdown`}
          component={asyncComponent(() =>
            import('../Uielements/Dropdown/dropdown')
          )}
        />
        <Route
          exact
          path={`${url}/op_badge`}
          component={asyncComponent(() => import('../Uielements/Badge'))}
        />
        <Route
          exact
          path={`${url}/op_card`}
          component={asyncComponent(() => import('../Uielements/Card'))}
        />
        <Route
          exact
          path={`${url}/op_carousel`}
          component={asyncComponent(() => import('../Uielements/Carousel'))}
        />
        <Route
          exact
          path={`${url}/op_collapse`}
          component={asyncComponent(() => import('../Uielements/Collapse'))}
        />
        <Route
          exact
          path={`${url}/op_tooltip`}
          component={asyncComponent(() => import('../Uielements/Tooltip/'))}
        />
        <Route
          exact
          path={`${url}/rating`}
          component={asyncComponent(() => import('../Uielements/rating/'))}
        />
        <Route
          exact
          path={`${url}/tree`}
          component={asyncComponent(() => import('../Uielements/Tree/'))}
        />
        <Route
          exact
          path={`${url}/op_tag`}
          component={asyncComponent(() => import('../Uielements/Tag'))}
        />
        <Route
          exact
          path={`${url}/op_timeline`}
          component={asyncComponent(() => import('../Uielements/Timeline'))}
        />
        <Route
          exact
          path={`${url}/op_popover`}
          component={asyncComponent(() => import('../Uielements/Popover'))}
        />
        <Route
          exact
          path={`${url}/googleChart`}
          component={asyncComponent(() => import('../Charts/googleChart'))}
        />
        <Route
          exact
          path={`${url}/reecharts`}
          component={asyncComponent(() => import('../Charts/recharts'))}
        />
        <Route
          exact
          path={`${url}/reactVis`}
          component={asyncComponent(() => import('../Charts/reactVis'))}
        />
        <Route
          exact
          path={`${url}/menu`}
          component={asyncComponent(() => import('../Navigation/menu'))}
        />
        <Route
          exact
          path={`${url}/ReactChart2`}
          component={asyncComponent(() => import('../Charts/reactChart2'))}
        />
        <Route
          exact
          path={`${url}/pagination`}
          component={asyncComponent(() =>
            import('../Uielements/Pagination/pagination')
          )}
        />
        <Route
          exact
          path={`${url}/reactTrend`}
          component={asyncComponent(() => import('../Charts/reactTrend'))}
        />
        <Route
          exact
          path={`${url}/invoice`}
          component={asyncComponent(() => import('../Page/invoice/invoice'))}
        />
        <Route
          exact
          path={`${url}/card`}
          component={asyncComponent(() => import('../Ecommerce/card'))}
        />
        <Route
          exact
          path={`${url}/cart`}
          component={asyncComponent(() => import('../Ecommerce/cart'))}
        />
        <Route
          exact
          path={`${url}/checkout`}
          component={asyncComponent(() => import('../Ecommerce/checkout'))}
        />
        <Route
          exact
          path={`${url}/shop`}
          component={asyncComponent(() =>
            import('../Ecommerce/algolia/instantSearch')
          )}
        />
        <Route
          exact
          path={`${url}/reactDates`}
          component={asyncComponent(() =>
            import('../AdvancedUI/ReactDates/reactDates')
          )}
        />
        <Route
          exact
          path={`${url}/codeMirror`}
          component={asyncComponent(() => import('../AdvancedUI/codeMirror'))}
        />
        <Route
          exact
          path={`${url}/uppy`}
          component={asyncComponent(() => import('../AdvancedUI/uppy'))}
        />
        <Route
          exact
          path={`${url}/dropzone`}
          component={asyncComponent(() => import('../AdvancedUI/dropzone'))}
        />
        <Route
          exact
          path={`${url}/youtubeSearch`}
          component={asyncComponent(() => import('../YoutubeSearch'))}
        />
        {getDevRouters(url)}
        <Route
          path={`${url}/promotion/:submodule?`}
          component={asyncComponent(() => import('../Promotion'))}
        />
        <Route
          path={`${url}/power`}
          component={asyncComponent(() => import('../Power'))}
        />
        <Route
          path={`${url}/:module`}
          component={asyncComponent(() => import('../Modules'))}
        />
      </Switch>
    );
  }
}

export default AppRouter;