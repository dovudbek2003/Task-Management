class UserTask {
    constructor(dto) {
        this.user_id = dto.userId;
        this.task_id = dto.taskId;
        this.start_at = dto.startAt;
        this.end_at = dto.endAt;
    }
}

module.exports = UserTask