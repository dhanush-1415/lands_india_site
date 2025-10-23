# TODO: Update API Functions for Agent and Value-Added-Service File Uploads

## Tasks
- [ ] Update createAgent function: Remove createdBy field append, ensure fields match task specification.
- [ ] Update updateAgent function: Use localStorage.getItem("agentId") for ID, append "id" with agentId, remove data.id logic, ensure fields match.
- [ ] Update createB2B function: Remove createdBy field append, ensure fields match task specification.
- [ ] Update updateB2B function: Use localStorage.getItem("b2bId") for ID, append "id" with b2bId, remove data.id logic, ensure fields match.
- [ ] Verify all functions use FormData and handle file uploads correctly (image max 1, files max 10).
