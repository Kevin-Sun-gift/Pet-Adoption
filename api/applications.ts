/**
 * 领养申请 API 服务
 */

import { post } from './client';

export interface ApplicationData {
    pet_id: string;
    applicant_name: string;
    phone: string;
    occupation?: string;
    reason?: string;
    has_pets: boolean;
    family_agreed: boolean;
    accept_followup: boolean;
    environment_photos: string[];
}

interface ApplicationResponse {
    id: string;
    status: string;
    created_at: string;
}

/**
 * 提交领养申请
 */
export async function submitApplication(
    data: ApplicationData
): Promise<ApplicationResponse> {
    return post<ApplicationResponse>('/applications', data);
}
