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
                <div class="modal-background" onClick={this.props.handleClose}></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Edit Card</p>
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
                        <section class="modal-card-body">
                                <label htmlFor="title">Title</label>
                                <Field id='title' type='text' name='title'/>
                                <label htmlFor="content">Content</label>
                                <Field id='content' as='textarea' name='content' />
                        </section>
                        <footer>
                            <button class="button is-success">Save changes</button>
                            <button class="button" onClick={this.props.handleClose}>Cancel</button>
                        </footer>
                        </Form>
                    </Formik>
                </div>
            </div>

        )
    }

}