import React from 'react';
import { Formik, Field, Form } from 'formik';

export default class CardModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modal: false
        }
    }

    render(){
        return (
            <div className={`modal ${this.props.isOpen ? "is-active" : ""}`}>
                <div className="modal-background" onClick={this.props.handleClose}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Edit Card</p>
                    </header>
                
                    <Formik
                        initialValues={this.props.laneValues}
                        onSubmit={(values) => {
                            this.props.updateLaneValues(values);
                            this.props.handleClose();
                            }
                        }
                    >
                    <Form>
                        <section className="modal-card-body">
                                <label htmlFor="title">Title</label>
                                <Field id='title' type='text' name='title'/>
                                <label htmlFor="content">Content</label>
                                <Field id='content' as='textarea' name='content' />
                        </section>
                        <footer>
                            <button className="button is-success">Save changes</button>
                            <button className="button" onClick={this.props.handleClose}>Cancel</button>
                        </footer>
                        </Form>
                    </Formik>
                </div>
            </div>

        )
    }

}