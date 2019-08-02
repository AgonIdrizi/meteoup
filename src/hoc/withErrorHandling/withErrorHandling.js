import React,{Component} from 'react'
import Aux from '../aux';
import {Alert} from 'antd'

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
		  error: null
		}

		componentDidMount () {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({error: null});
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(res => res, error => {
				this.setState({error: error});
			});
		}

		componentWillUnmount() {
			console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({error: null})
		}
		
		render (){
		  const displayError = this.state.error ? <Alert message={"Error"} type="error" description={this.state.error.message} closable onClose={() => {}}   /> : null
		  return(
			<Aux>
			  {displayError}
			  <WrappedComponent {...this.props} />
			</Aux>
		  );
		}
	}
}

export default withErrorHandler;