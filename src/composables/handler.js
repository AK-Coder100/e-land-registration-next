const handleApiError = (err, options = {}) => {
    if (err.code == 401) {
        return "Auth not found"
    }
}