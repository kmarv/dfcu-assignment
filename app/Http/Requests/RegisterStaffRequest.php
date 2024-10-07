<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterStaffRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'surname' => 'required|string',
            'other_names' => 'required|string',
            'dob' => 'required|date_format:Y-m-d', // ISO 8601 format
            'id_photo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'auth_code' => 'required|digits:10|exists:auth_codes,code', // Ensure authenticity
        ];
    }

}
