# TODO: Integrate File Upload UI in MyProfile Component

## Steps to Complete

- [ ] Add state for selectedFiles (array of File objects) to manage multiple file uploads.
- [ ] Add a new UI section "Upload Additional Files" below the avatar section, including:
  - Multiple file input with restrictions (e.g., accept=".pdf,.doc,.docx,.jpg,.png", max size 5MB per file).
  - Display selected files with remove options.
- [ ] Update handleProfileUpdate function to include selectedFiles in the payload for UpdateUser calls (for regular users).
- [ ] Add basic validation for files (file size, type, count limits) and error handling.
- [ ] Ensure proper integration: files are appended to FormData in UpdateUser API call.
- [ ] Test file upload for regular users: select multiple files, submit, verify API call and response.
- [ ] Verify UI responsiveness and error messages.
- [ ] Check if agents/B2B need file uploads; if so, note for backend API updates.
