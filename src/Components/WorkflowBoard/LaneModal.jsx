import React from 'react';
import { Formik, Field, Form, useFormik } from 'formik';

export default class LaneModal extends React.Component{
    
    render(){

        return (
            <Formik
                initialValues={this.props.laneValues}
                onSubmit={(values) => {
                    this.props.updateLaneValues(values);
                    this.props.handleClose();
                    }
                }
            >
            {(formik) => (
                <div className={`modal ${this.props.isOpen ? "is-active" : ""}`}>
                    <div className="modal-background" 
                    onClick={(event) => {
                        event.preventDefault()
                        formik.resetForm()
                        this.props.handleClose();}}></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Edit Lane</p>
                        </header>
                        <Form>
                            <section className="modal-card-body">
                                <div className="field">
                                    <label className="label">Title</label>
                                    <div className="control">
                                        <Field className="input" id='title' type='text' name='title'/>
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