const Course_progress = require("../models/Course_progress");

exports.update_course_progress = async (req, res) => {
    try{
        //TODO
        const user_id = req.user.id;
        const course_id = req.body.course_id;
        const sub_section_id = req.body.sub_section_id;

        const course_progress = await Course_progress.findOne({
            course_id: course_id,
            user_id: user_id
        });

        if(!course_progress){
            return res.status(404).json({
                success: false,
                message: "COURSE PROGRESS NOT FOUND"
             })
        }

        if(course_progress.completed_videos.includes(sub_section_id)){
            return res.status(400).json({
                success: false,
                message: "SUB-SECTION ALREADY MARKED AS READ"
            })
        }

        course_progress.completed_videos.push(sub_section_id);
        await course_progress.save();

        return res.status(200).json({
            success: true,
            completed_videos: course_progress.completed_videos,
            message: "ENROLLED COURSES FETCHED SUCCESSFULLY"
         })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE COURSE PROGRESS"
        })
    }
}
