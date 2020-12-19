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
            <Formik
                initialValues={this.props.cardValues}
                onSubmit={(values) => {
                    this.props.updateCardValues(values);
                    this.props.handleClose();
                    }
                }
            >
            {(formik) => (
                <div className={`modal ${this.props.isOpen ? "is-active" : ""}`}>
                    <div className="modal-background" onClick={(event) => {
                                    event.preventDefault()
                                    formik.resetForm()
                                    this.props.handleClose();
                                }}></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Edit Card</p>
                        </header>
                    
                        
                        <Form>
                            <section className="modal-card-body">
                                <div className="field">
                                    <label className="label">Title</label>
                                    <div className="control">
                                        <Field className="input" id='title' type='text' name='title'/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Content</label>
                                    <div className="control">
                                        <Field className="input" id='content' as='textarea' name='content' />
                                    </div>
                                </div>
                                    
                            </section>
                            <footer className="modal-card-foot">
                                <button type="submit" className="button is-success">Save changes</button>
                                <button className="button" onClick={(event) => {
                                    event.preventDefault()
                                    formik.resetForm()
                                    this.props.handleClose();
                                }}>Cancel</button>
                            </footer>
                            </Form>
                    </div>
                </div>
            )}
            </Formik>

        )
    }

}