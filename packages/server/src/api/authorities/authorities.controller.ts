import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthoritiesService } from './authorities.service';
import { AuthorityGroup } from './authority-groups.model';

@Controller({ path: 'authorities' })
export class AuthoritiesController {
  constructor(private readonly service: AuthoritiesService) {}

  @Get()
  @ApiResponse({ type: [AuthorityGroup] })
  getAuthorityGroups() {
    return this.service.getAuthorityGroups();
  }
}
