<template>
    <div>
        
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-md-12">
                <div class="col-md-6" v-for="error in errors" :key="error">
                <div class=" alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    {{error}}
                </div>
                </div>
            </div>
            </div>
                 <div class="row">
                <div class="col-lg-12">
                    <div class="tabs-container">
                        <ul class="nav nav-tabs" role="tablist">
                            <li><a class="nav-link active" data-toggle="tab" href="#tab-1">Monday</a></li>
                            <li><a class="nav-link" data-toggle="tab" href="#tab-2">Tuesday</a></li>
                            <li><a class="nav-link" data-toggle="tab" href="#tab-3">Wednesday</a></li>
                            <li><a class="nav-link" data-toggle="tab" href="#tab-4">Thursday</a></li>
                            <li><a class="nav-link" data-toggle="tab" href="#tab-5">Friday</a></li>
                            <li><a class="nav-link" data-toggle="tab" href="#tab-6">Saturday</a></li>
                            <li><a class="nav-link" data-toggle="tab" href="#tab-7">Sunday</a></li>

                        </ul>
                        <div class="tab-content">
                            <div role="tabpanel" id="tab-1" class="tab-pane active">
                                <div class="ibox">
                                    <div class="ibox-title">
                                        <h5>All form elements <small>With custom checbox and radion elements.</small></h5>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Day</label>
                                            <div class="col-sm-6"><input v-model="day" placeholder="Ex: Monday" type="text" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">maxPerDay</label>
                                            <div class="col-sm-6"><input v-model="maxPerDay" placeholder="RM 12.00" type="number" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Grace</label>    
                                            <div class="col-sm-6"><input v-model="grace" placeholder="30 Minutes" type="number" class="form-control"></div>
                                        </div>
                                    </div>

                                    <div class="ibox-content">
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Set First Hours</label>
                                                <div class="col-sm-6"><input v-model="setHours" placeholder="3 Hours" type="number" class="form-control"></div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                <div class="col-sm-6"><input v-model="setFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleSetFirstHours">Add</button>
                                                </div>
                                            </div>
                                            <table  v-show="setFirstHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Set First Hourse</th>
                                                <th data-hide="phone,tablet">Set Fees</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="h in setFirstHours" :key="h" v-show="setFirstHours.length > 0" class="gradeU">
                                                    <td>{{ h.setHours + " " + ' Hours' || 'Unknown'}}</td>
                                                    <td>{{'RM ' + h.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <label>continous Hours</label>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                            <div class="col-sm-6"><input v-model="constartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous Start</label>
                                                <div class="col-sm-6"><select v-model="selectContinousStart" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                <div class="col-sm-6"><input v-model="conendTime"  placeholder="6 AM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous End</label>
                                                <div class="col-sm-6"><select v-model="selectContinousEnd" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Hour Rate</label>
                                                <div class="col-sm-6"><input v-model="setHourRate"  placeholder="RM 2.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleContinousHours">Add</button>
                                                </div>
                                            </div>
                                            <table v-show="continousHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Continous Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Continous End</th>
                                                <th data-hide="phone,tablet">Set Hour Rate</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="con in continousHours" :key="con" v-show="continousHours.length > 0" class="gradeU">
                                                    <td>{{con.startTime || 'Unknown'}}</td>
                                                    <td>{{con.startD || 'Unknown'}}</td>
                                                    <td>{{con.endTime || 'Unknown'}}</td>
                                                    <td>{{con.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + con.setHourRate || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="col-sm-12">
                                                <label>Entry Session</label>
                                                <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                                        <div class="col-sm-6"><input v-model="entrystartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry Start</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryStart" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                        <div class="col-sm-6"><input v-model="entryendTime" placeholder="6 AM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry End</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryEnd" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                        <div class="col-sm-6"><input v-model="entrysetFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                                <button class="btn btn-primary btn-sm" @click="addMultipleEntrySession">Add</button>
                                                        </div>
                                                    </div>
                                            </div>
                                            <table  v-show="entrySession.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Entry Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Entry End</th>
                                                <th data-hide="phone,tablet">Set Fees</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="entry in entrySession" :key="entry" v-show="entrySession.length > 0" class="gradeU">
                                                    <td>{{entry.startTime || 'Unknown'}}</td>
                                                    <td>{{entry.startD || 'Unknown'}}</td>
                                                    <td>{{entry.endTime || 'Unknown'}}</td>
                                                    <td>{{entry.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + entry.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            
                            </div>
                              <div role="tabpanel" id="tab-2" class="tab-pane">
                                <div class="ibox">
                                    <div class="ibox-title">
                                        <h5>All form elements <small>With custom checbox and radion elements.</small></h5>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Day</label>
                                            <div class="col-sm-6"><input v-model="day" placeholder="Ex: Monday" type="text" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">maxPerDay</label>
                                            <div class="col-sm-6"><input v-model="maxPerDay" placeholder="RM 12.00" type="number" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Grace</label>    
                                            <div class="col-sm-6"><input v-model="grace" placeholder="30 Minutes" type="number" class="form-control"></div>
                                        </div>
                                    </div>

                                    <div class="ibox-content">
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Set First Hours</label>
                                                <div class="col-sm-6"><input v-model="setHours" placeholder="3 Hours" type="number" class="form-control"></div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                <div class="col-sm-6"><input v-model="setFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleSetFirstHours">Add</button>
                                                </div>
                                            </div>
                                            <table  v-show="setFirstHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Set First Hourse</th>
                                                <th data-hide="phone,tablet">Set Fees</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="h in setFirstHours" :key="h" v-show="setFirstHours.length > 0" class="gradeU">
                                                    <td>{{ h.setHours + " " + ' Hours' || 'Unknown'}}</td>
                                                    <td>{{'RM ' + h.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <label>continous Hours</label>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                            <div class="col-sm-6"><input v-model="constartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous Start</label>
                                                <div class="col-sm-6"><select v-model="selectContinousStart" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                <div class="col-sm-6"><input v-model="conendTime"  placeholder="6 AM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous End</label>
                                                <div class="col-sm-6"><select v-model="selectContinousEnd" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Hour Rate</label>
                                                <div class="col-sm-6"><input v-model="setHourRate"  placeholder="RM 2.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleContinousHours">Add</button>
                                                </div>
                                            </div>
                                            <table v-show="continousHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Continous Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Continous End</th>
                                                <th data-hide="phone,tablet">Set Hour Rate</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="con in continousHours" :key="con" v-show="continousHours.length > 0" class="gradeU">
                                                    <td>{{con.startTime || 'Unknown'}}</td>
                                                    <td>{{con.startD || 'Unknown'}}</td>
                                                    <td>{{con.endTime || 'Unknown'}}</td>
                                                    <td>{{con.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + con.setHourRate || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="col-sm-12">
                                                <label>Entry Session</label>
                                                <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                                        <div class="col-sm-6"><input v-model="entrystartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry Start</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryStart" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                        <div class="col-sm-6"><input v-model="entryendTime" placeholder="6 AM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry End</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryEnd" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                        <div class="col-sm-6"><input v-model="entrysetFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                                <button class="btn btn-primary btn-sm" @click="addMultipleEntrySession">Add</button>
                                                        </div>
                                                    </div>
                                            </div>
                                            <table  v-show="entrySession.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Entry Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Entry End</th>
                                                <th data-hide="phone,tablet">Set Fees</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="entry in entrySession" :key="entry" v-show="entrySession.length > 0" class="gradeU">
                                                    <td>{{entry.startTime || 'Unknown'}}</td>
                                                    <td>{{entry.startD || 'Unknown'}}</td>
                                                    <td>{{entry.endTime || 'Unknown'}}</td>
                                                    <td>{{entry.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + entry.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            
                            </div>
                             <div role="tabpanel" id="tab-3" class="tab-pane">
                                <div class="ibox">
                                    <div class="ibox-title">
                                        <h5>All form elements <small>With custom checbox and radion elements.</small></h5>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Day</label>
                                            <div class="col-sm-6"><input v-model="day" placeholder="Ex: Monday" type="text" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">maxPerDay</label>
                                            <div class="col-sm-6"><input v-model="maxPerDay" placeholder="RM 12.00" type="number" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Grace</label>    
                                            <div class="col-sm-6"><input v-model="grace" placeholder="30 Minutes" type="number" class="form-control"></div>
                                        </div>
                                    </div>

                                    <div class="ibox-content">
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Set First Hours</label>
                                                <div class="col-sm-6"><input v-model="setHours" placeholder="3 Hours" type="number" class="form-control"></div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                <div class="col-sm-6"><input v-model="setFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleSetFirstHours">Add</button>
                                                </div>
                                            </div>
                                            <table  v-show="setFirstHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Set First Hourse</th>
                                                <th data-hide="phone,tablet">Set Fees</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="h in setFirstHours" :key="h" v-show="setFirstHours.length > 0" class="gradeU">
                                                    <td>{{ h.setHours + " " + ' Hours' || 'Unknown'}}</td>
                                                    <td>{{'RM ' + h.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <label>continous Hours</label>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                            <div class="col-sm-6"><input v-model="constartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous Start</label>
                                                <div class="col-sm-6"><select v-model="selectContinousStart" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                <div class="col-sm-6"><input v-model="conendTime"  placeholder="6 AM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous End</label>
                                                <div class="col-sm-6"><select v-model="selectContinousEnd" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Hour Rate</label>
                                                <div class="col-sm-6"><input v-model="setHourRate"  placeholder="RM 2.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleContinousHours">Add</button>
                                                </div>
                                            </div>
                                            <table v-show="continousHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Continous Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Continous End</th>
                                                <th data-hide="phone,tablet">Set Hour Rate</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="con in continousHours" :key="con" v-show="continousHours.length > 0" class="gradeU">
                                                    <td>{{con.startTime || 'Unknown'}}</td>
                                                    <td>{{con.startD || 'Unknown'}}</td>
                                                    <td>{{con.endTime || 'Unknown'}}</td>
                                                    <td>{{con.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + con.setHourRate || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="col-sm-12">
                                                <label>Entry Session</label>
                                                <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                                        <div class="col-sm-6"><input v-model="entrystartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry Start</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryStart" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                        <div class="col-sm-6"><input v-model="entryendTime" placeholder="6 AM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry End</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryEnd" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                        <div class="col-sm-6"><input v-model="entrysetFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                                <button class="btn btn-primary btn-sm" @click="addMultipleEntrySession">Add</button>
                                                        </div>
                                                    </div>
                                            </div>
                                            <table  v-show="entrySession.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Entry Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Entry End</th>
                                                <th data-hide="phone,tablet">Set Fees</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="entry in entrySession" :key="entry" v-show="entrySession.length > 0" class="gradeU">
                                                    <td>{{entry.startTime || 'Unknown'}}</td>
                                                    <td>{{entry.startD || 'Unknown'}}</td>
                                                    <td>{{entry.endTime || 'Unknown'}}</td>
                                                    <td>{{entry.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + entry.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            
                            </div>
                              <div role="tabpanel" id="tab-4" class="tab-pane">
                                <div class="ibox">
                                    <div class="ibox-title">
                                        <h5>All form elements <small>With custom checbox and radion elements.</small></h5>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Day</label>
                                            <div class="col-sm-6"><input v-model="day" placeholder="Ex: Monday" type="text" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">maxPerDay</label>
                                            <div class="col-sm-6"><input v-model="maxPerDay" placeholder="RM 12.00" type="number" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Grace</label>    
                                            <div class="col-sm-6"><input v-model="grace" placeholder="30 Minutes" type="number" class="form-control"></div>
                                        </div>
                                    </div>

                                    <div class="ibox-content">
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Set First Hours</label>
                                                <div class="col-sm-6"><input v-model="setHours" placeholder="3 Hours" type="number" class="form-control"></div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                <div class="col-sm-6"><input v-model="setFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleSetFirstHours">Add</button>
                                                </div>
                                            </div>
                                            <table  v-show="setFirstHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Set First Hourse</th>
                                                <th data-hide="phone,tablet">Set Fees</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="h in setFirstHours" :key="h" v-show="setFirstHours.length > 0" class="gradeU">
                                                    <td>{{ h.setHours + " " + ' Hours' || 'Unknown'}}</td>
                                                    <td>{{'RM ' + h.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <label>continous Hours</label>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                            <div class="col-sm-6"><input v-model="constartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous Start</label>
                                                <div class="col-sm-6"><select v-model="selectContinousStart" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                <div class="col-sm-6"><input v-model="conendTime"  placeholder="6 AM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous End</label>
                                                <div class="col-sm-6"><select v-model="selectContinousEnd" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Hour Rate</label>
                                                <div class="col-sm-6"><input v-model="setHourRate"  placeholder="RM 2.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleContinousHours">Add</button>
                                                </div>
                                            </div>
                                            <table v-show="continousHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Continous Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Continous End</th>
                                                <th data-hide="phone,tablet">Set Hour Rate</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="con in continousHours" :key="con" v-show="continousHours.length > 0" class="gradeU">
                                                    <td>{{con.startTime || 'Unknown'}}</td>
                                                    <td>{{con.startD || 'Unknown'}}</td>
                                                    <td>{{con.endTime || 'Unknown'}}</td>
                                                    <td>{{con.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + con.setHourRate || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="col-sm-12">
                                                <label>Entry Session</label>
                                                <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                                        <div class="col-sm-6"><input v-model="entrystartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry Start</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryStart" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                        <div class="col-sm-6"><input v-model="entryendTime" placeholder="6 AM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry End</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryEnd" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                        <div class="col-sm-6"><input v-model="entrysetFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                                <button class="btn btn-primary btn-sm" @click="addMultipleEntrySession">Add</button>
                                                        </div>
                                                    </div>
                                            </div>
                                            <table  v-show="entrySession.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Entry Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Entry End</th>
                                                <th data-hide="phone,tablet">Set Fees</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="entry in entrySession" :key="entry" v-show="entrySession.length > 0" class="gradeU">
                                                    <td>{{entry.startTime || 'Unknown'}}</td>
                                                    <td>{{entry.startD || 'Unknown'}}</td>
                                                    <td>{{entry.endTime || 'Unknown'}}</td>
                                                    <td>{{entry.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + entry.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            
                            </div>
                              <div role="tabpanel" id="tab-5" class="tab-pane">
                                <div class="ibox">
                                    <div class="ibox-title">
                                        <h5>All form elements <small>With custom checbox and radion elements.</small></h5>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Day</label>
                                            <div class="col-sm-6"><input v-model="day" placeholder="Ex: Monday" type="text" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">maxPerDay</label>
                                            <div class="col-sm-6"><input v-model="maxPerDay" placeholder="RM 12.00" type="number" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Grace</label>    
                                            <div class="col-sm-6"><input v-model="grace" placeholder="30 Minutes" type="number" class="form-control"></div>
                                        </div>
                                    </div>

                                    <div class="ibox-content">
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Set First Hours</label>
                                                <div class="col-sm-6"><input v-model="setHours" placeholder="3 Hours" type="number" class="form-control"></div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                <div class="col-sm-6"><input v-model="setFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleSetFirstHours">Add</button>
                                                </div>
                                            </div>
                                            <table  v-show="setFirstHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Set First Hourse</th>
                                                <th data-hide="phone,tablet">Set Fees</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="h in setFirstHours" :key="h" v-show="setFirstHours.length > 0" class="gradeU">
                                                    <td>{{ h.setHours + " " + ' Hours' || 'Unknown'}}</td>
                                                    <td>{{'RM ' + h.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <label>continous Hours</label>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                            <div class="col-sm-6"><input v-model="constartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous Start</label>
                                                <div class="col-sm-6"><select v-model="selectContinousStart" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                <div class="col-sm-6"><input v-model="conendTime"  placeholder="6 AM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous End</label>
                                                <div class="col-sm-6"><select v-model="selectContinousEnd" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Hour Rate</label>
                                                <div class="col-sm-6"><input v-model="setHourRate"  placeholder="RM 2.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleContinousHours">Add</button>
                                                </div>
                                            </div>
                                            <table v-show="continousHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Continous Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Continous End</th>
                                                <th data-hide="phone,tablet">Set Hour Rate</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="con in continousHours" :key="con" v-show="continousHours.length > 0" class="gradeU">
                                                    <td>{{con.startTime || 'Unknown'}}</td>
                                                    <td>{{con.startD || 'Unknown'}}</td>
                                                    <td>{{con.endTime || 'Unknown'}}</td>
                                                    <td>{{con.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + con.setHourRate || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="col-sm-12">
                                                <label>Entry Session</label>
                                                <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                                        <div class="col-sm-6"><input v-model="entrystartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry Start</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryStart" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                        <div class="col-sm-6"><input v-model="entryendTime" placeholder="6 AM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry End</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryEnd" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                        <div class="col-sm-6"><input v-model="entrysetFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                                <button class="btn btn-primary btn-sm" @click="addMultipleEntrySession">Add</button>
                                                        </div>
                                                    </div>
                                            </div>
                                            <table  v-show="entrySession.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Entry Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Entry End</th>
                                                <th data-hide="phone,tablet">Set Fees</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="entry in entrySession" :key="entry" v-show="entrySession.length > 0" class="gradeU">
                                                    <td>{{entry.startTime || 'Unknown'}}</td>
                                                    <td>{{entry.startD || 'Unknown'}}</td>
                                                    <td>{{entry.endTime || 'Unknown'}}</td>
                                                    <td>{{entry.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + entry.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            
                            </div>
                              <div role="tabpanel" id="tab-6" class="tab-pane">
                                <div class="ibox">
                                    <div class="ibox-title">
                                        <h5>All form elements <small>With custom checbox and radion elements.</small></h5>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Day</label>
                                            <div class="col-sm-6"><input v-model="day" placeholder="Ex: Monday" type="text" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">maxPerDay</label>
                                            <div class="col-sm-6"><input v-model="maxPerDay" placeholder="RM 12.00" type="number" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Grace</label>    
                                            <div class="col-sm-6"><input v-model="grace" placeholder="30 Minutes" type="number" class="form-control"></div>
                                        </div>
                                    </div>

                                    <div class="ibox-content">
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Set First Hours</label>
                                                <div class="col-sm-6"><input v-model="setHours" placeholder="3 Hours" type="number" class="form-control"></div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                <div class="col-sm-6"><input v-model="setFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleSetFirstHours">Add</button>
                                                </div>
                                            </div>
                                            <table  v-show="setFirstHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Set First Hourse</th>
                                                <th data-hide="phone,tablet">Set Fees</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="h in setFirstHours" :key="h" v-show="setFirstHours.length > 0" class="gradeU">
                                                    <td>{{ h.setHours + " " + ' Hours' || 'Unknown'}}</td>
                                                    <td>{{'RM ' + h.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <label>continous Hours</label>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                            <div class="col-sm-6"><input v-model="constartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous Start</label>
                                                <div class="col-sm-6"><select v-model="selectContinousStart" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                <div class="col-sm-6"><input v-model="conendTime"  placeholder="6 AM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous End</label>
                                                <div class="col-sm-6"><select v-model="selectContinousEnd" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Hour Rate</label>
                                                <div class="col-sm-6"><input v-model="setHourRate"  placeholder="RM 2.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleContinousHours">Add</button>
                                                </div>
                                            </div>
                                            <table v-show="continousHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Continous Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Continous End</th>
                                                <th data-hide="phone,tablet">Set Hour Rate</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="con in continousHours" :key="con" v-show="continousHours.length > 0" class="gradeU">
                                                    <td>{{con.startTime || 'Unknown'}}</td>
                                                    <td>{{con.startD || 'Unknown'}}</td>
                                                    <td>{{con.endTime || 'Unknown'}}</td>
                                                    <td>{{con.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + con.setHourRate || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="col-sm-12">
                                                <label>Entry Session</label>
                                                <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                                        <div class="col-sm-6"><input v-model="entrystartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry Start</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryStart" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                        <div class="col-sm-6"><input v-model="entryendTime" placeholder="6 AM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry End</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryEnd" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                        <div class="col-sm-6"><input v-model="entrysetFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                                <button class="btn btn-primary btn-sm" @click="addMultipleEntrySession">Add</button>
                                                        </div>
                                                    </div>
                                            </div>
                                            <table  v-show="entrySession.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Entry Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Entry End</th>
                                                <th data-hide="phone,tablet">Set Fees</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="entry in entrySession" :key="entry" v-show="entrySession.length > 0" class="gradeU">
                                                    <td>{{entry.startTime || 'Unknown'}}</td>
                                                    <td>{{entry.startD || 'Unknown'}}</td>
                                                    <td>{{entry.endTime || 'Unknown'}}</td>
                                                    <td>{{entry.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + entry.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            
                            </div>
                              <div role="tabpanel" id="tab-7" class="tab-pane">
                                <div class="ibox">
                                    <div class="ibox-title">
                                        <h5>All form elements <small>With custom checbox and radion elements.</small></h5>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Day</label>
                                            <div class="col-sm-6"><input v-model="day" placeholder="Ex: Monday" type="text" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">maxPerDay</label>
                                            <div class="col-sm-6"><input v-model="maxPerDay" placeholder="RM 12.00" type="number" class="form-control"></div>
                                        </div>
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Grace</label>    
                                            <div class="col-sm-6"><input v-model="grace" placeholder="30 Minutes" type="number" class="form-control"></div>
                                        </div>
                                    </div>

                                    <div class="ibox-content">
                                        <div class="form-group  row"><label class="col-sm-2 col-form-label">Set First Hours</label>
                                                <div class="col-sm-6"><input v-model="setHours" placeholder="3 Hours" type="number" class="form-control"></div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                <div class="col-sm-6"><input v-model="setFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleSetFirstHours">Add</button>
                                                </div>
                                            </div>
                                            <table  v-show="setFirstHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Set First Hourse</th>
                                                <th data-hide="phone,tablet">Set Fees</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="h in setFirstHours" :key="h" v-show="setFirstHours.length > 0" class="gradeU">
                                                    <td>{{ h.setHours + " " + ' Hours' || 'Unknown'}}</td>
                                                    <td>{{'RM ' + h.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <label>continous Hours</label>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                            <div class="col-sm-6"><input v-model="constartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous Start</label>
                                                <div class="col-sm-6"><select v-model="selectContinousStart" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                <div class="col-sm-6"><input v-model="conendTime"  placeholder="6 AM" type="time" class="form-control"></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Select Continous End</label>
                                                <div class="col-sm-6"><select v-model="selectContinousEnd" class="form-control m-b" name="account">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Hour Rate</label>
                                                <div class="col-sm-6"><input v-model="setHourRate"  placeholder="RM 2.00" type="number" class="form-control">
                                                    <button class="btn btn-primary btn-sm" @click="addMultipleContinousHours">Add</button>
                                                </div>
                                            </div>
                                            <table v-show="continousHours.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Continous Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Continous End</th>
                                                <th data-hide="phone,tablet">Set Hour Rate</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="con in continousHours" :key="con" v-show="continousHours.length > 0" class="gradeU">
                                                    <td>{{con.startTime || 'Unknown'}}</td>
                                                    <td>{{con.startD || 'Unknown'}}</td>
                                                    <td>{{con.endTime || 'Unknown'}}</td>
                                                    <td>{{con.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + con.setHourRate || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="ibox-content">
                                        <div class="col-sm-12">
                                                <label>Entry Session</label>
                                                <div class="form-group  row"><label class="col-sm-2 col-form-label">Start Time</label>
                                                        <div class="col-sm-6"><input v-model="entrystartTime" placeholder="6 PM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry Start</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryStart" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">End Time</label>
                                                        <div class="col-sm-6"><input v-model="entryendTime" placeholder="6 AM" type="time" class="form-control"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Select Entry End</label>
                                                        <div class="col-sm-6"><select v-model="selectEntryEnd" class="form-control m-b" name="account">
                                                            <option>AM</option>
                                                            <option>PM</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group  row"><label class="col-sm-2 col-form-label">Set Fees</label>
                                                        <div class="col-sm-6"><input v-model="entrysetFees"  placeholder="RM 4.00" type="number" class="form-control">
                                                                <button class="btn btn-primary btn-sm" @click="addMultipleEntrySession">Add</button>
                                                        </div>
                                                    </div>
                                            </div>
                                            <table  v-show="entrySession.length > 0" class="footable table table-stripped" data-page-size="8" data-filter=#filter>
                                            <thead>
                                            <tr>

                                                <th data-hide="phone,tablet">Start Time</th>
                                                <th data-hide="phone,tablet">Select Entry Start</th>
                                                <th data-hide="phone,tablet">End End</th>
                                                <th data-hide="phone,tablet">Select Entry End</th>
                                                <th data-hide="phone,tablet">Set Fees</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="entry in entrySession" :key="entry" v-show="entrySession.length > 0" class="gradeU">
                                                    <td>{{entry.startTime || 'Unknown'}}</td>
                                                    <td>{{entry.startD || 'Unknown'}}</td>
                                                    <td>{{entry.endTime || 'Unknown'}}</td>
                                                    <td>{{entry.endD || 'Unknown'}}</td>
                                                    <td>{{'RM ' + entry.setFees || 'Unknown'}}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="5">
                                                    <ul class="pagination float-right"></ul>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            
                            </div>
                        </div>


                    </div>
                </div>
              
            </div>

         <div class="row">
                <div class="col-lg-12">
                    <div class="col-sm-4 col-sm-offset-2">
                        <button class="btn btn-primary btn-sm" @click="isValid">Save changes</button>
                    </div>                  
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import qs from 'qs'

export default {
  name: 'CarparkFees',
  data () {
    return {
      day: null,
      maxPerDay: null,
      grace: null,
      continousHours: [],
      constartTime: null,
      selectContinousStart: null,
      conendTime: null,
      selectContinousEnd: null,
      setHourRate: null,

      setFirstHours: [],
      setHours: null,
      setFees:null,

      entrySession: [],
      entrystartTime: null,
      selectEntryStart: null,
      entryendTime: null,
      selectEntryEnd: null,
      entrysetFees: null,
      errors: [],
    
      session: null,
      data: [],

    }
  },
  
  methods: {
    addMultipleSetFirstHours() {
        if(this.setHours && this.setFees) {
              this.setFirstHours.push({
            setHours: this.setHours,
            setFees:this.setFees
            });
            this.setHours = " "
            this.setFees = " "
        }
      
    },
    addMultipleContinousHours() {
        this.continousHours.push({
            setFirstHours: this.setFirstHours,
            startTime: this.constartTime,
            startD: this.selectContinousStart,
            endTime: this.conendTime,
            endD: this.selectContinousEnd,
            setHourRate: this.setHourRate
        });
        this.startTime = " "
        this.startD = " "
        this.endTime = " "
        this.endD = " "
        this.setHourRate = " "
    },
    addMultipleEntrySession() {
        this.entrySession.push({
            startTime: this.entrystartTime,
            startD: this.selectEntryStart,
            endTime: this.entryendTime,
            endD: this.selectEntryEnd,
            setFees: this.entrysetFees
        });
        this.startTime = " "
        this.startD = " "
        this.endTime = " "
        this.endD = " "
        this.setFees = " "

    },
    addSession() {
         this.session = {
                day: this.day,
                maxPerDay: this.maxPerDay,
                grace: this.grace,
                continousHours: this.continousHours,
                entrySession: this.entrySession
            }
        this.setFirstHours = []
        this.continousHours = []
        this.entrySession = []
        this.data.push(this.session);
       
        const parsed = JSON.stringify(this.data)
        localStorage.setItem('data', parsed);
        if(JSON.parse(localStorage.getItem('data')).length > 7) {
            localStorage.removeItem('data');
        }

     
    },
    addFees() {
        console.log(localStorage.getItem('data'));
        if(JSON.parse(localStorage.getItem('data')).length > 7) {
                console.log(localStorage.getItem('data'));
                localStorage.removeItem('data');
        }
    },
    
    isValid() {
      setTimeout(() => {
        $('.alert').alert('close')
      }, 2000)

        if(!this.constartTime && !this.conendTime && !this.entrystartTime && !this.entryendTime) {
            this.errors.push('please fill up the form!!')
                setTimeout(() => {
                    swal({
                        title: 'please fill up the form!!',
                        icon: 'error'
                    })
                }, 1000)

        } if(this.constartTime && this.conendTime > 12) {
            this.errors.push('Continous Start Time Worng and Continous End Time Worng!!')
           

        } if(this.entrystartTime && this.entryendTime > 12) {
            this.errors.push('Entry Start Time Worng and Entry End Time Worng!!')
          

        } if (this.selectContinousStart == this.selectContinousEnd && (this.constartTime && this.conendTime <= 12)) {
            if(this.constartTime >= this.conendTime) {
                this.errors.push('Continous End Time Worng!! it suppose to be +1 hour');
               
            }
        } if (this.selectEntryStart == this.selectEntryEnd) {
            if(this.entrystartTime >= this.entryendTime) {
                this.errors.push('Entry End Time Worng!! it suppose to be +1 hour')
                setTimeout(() => {
                    swal({
                        title: 'Entry End Time Worng!! it suppose to be +1 hour',
                        icon: 'error'
                    })
                }, 1000)
              
            }
        } else {
        this.errors = []
        this.addSession()
        setTimeout(() => {
          swal({
            title: 'Add it successfully',
            icon: 'success'
          })
        }, 1000)
        return true
      }
    },

    
  },
  mounted() {

    axios({
        method: 'put',
        url: 'sys/api/carparks/1/rates',
        data: qs.stringify({rate: localStorage.getItem('data')}),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTM4OTgxMzQwLCJleHAiOjE1MzkwNjc3NDB9.3pGe0Ub6Kf5l8KIKsDh9e9IxpTzMTRi-IPs_2NqVkSk',
        },
        }).then(response => {
            console.log(response)
        })
        .catch(error => {
            throw(error);
        });
    },
}

</script>
